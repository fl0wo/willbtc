"use client";

import React, {useEffect, useState} from "react";
import {useTopic} from "@/app/use/topic-provider";
import {Subscription} from "rxjs";
import {WorkflowEvent, WorkflowEventType} from "@/app/model/momento/WorkflowEvent";
import {removeDuplicatesArrayByKey} from "@/app/utils";
import {BotType} from "@/libs/drizzle/models/BotType";
import {UserType} from "@/libs/drizzle/models/UserType";
import {fixedSteps} from "@/app/dashboard/steps/blogCreationSteps";

type FixedStep = {
    emoji: string,
    title: string,
    titlePast?: string,
    titleFuture?: string,
    criteria: {
        completed: (ev: WorkflowEvent) => boolean | undefined,
    },
    noSubSteps?: boolean,
}

// emojis for the steps:

export function LiveWorkflowStatus(props: {
    user: UserType,
    bot: BotType,
    hydrateLastJob:boolean
}) {

    const topic$ = useTopic();

    const [receivedEvents, setReceivedEvents] = useState<WorkflowEvent[]>([]);
    const [selectedStep, setSelectedStep] = useState<WorkflowEvent | undefined>(undefined);
    const [highestStepIndex, setHighestStepIndex] = useState<number>(-1);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setReceivedEvents([
                {
                    id: '_0',
                    type: WorkflowEventType.REPO_IDENTITY,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    repoName: 'turso',
                    eventName: 'validated_repo',
                    status: 'waiting',
                    steps: []
                },
            ]);
        },3500);

        setTimeout(() => {
            setReceivedEvents([
                {
                    id: '_1',
                    type: WorkflowEventType.REPO_IDENTITY,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    repoName: 'turso',
                    status: 'completed',
                    steps: []
                },
            ]);
        },5500);
    }, []);

    useEffect(() => {
        if (!!props.bot.lastJob && props.hydrateLastJob) {
            setReceivedEvents([
                props.bot.lastJob
            ]);
        }
    }, [props.bot.lastJob]);

    useEffect(() => {
        const subscription: Subscription = topic$.subscribe({
            next: (item: WorkflowEvent) => {
                if (item) {
                    setReceivedEvents((prevItems) => [
                        ...removeDuplicatesArrayByKey(prevItems, 'id'), item]
                    );
                    console.log(item)
                }
            },
            error: (err) => console.error('Subscription error:', err),
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [topic$]);

    return <div>
        <ul
            className="steps text-primary font-bold text-sm bg-white pt-6 pb-4 rounded-sm width-100 height-100 steps-vertical lg:steps-horizontal">
            {
                fixedSteps.map((fixedStep, index) => {

                    // is there an event received that match the criteria of this fixedStep?
                    const solvingEvent = receivedEvents
                        .find(fixedStep.criteria.completed);

                    const openSubStepsForJob = (step?: WorkflowEvent, fixedStep?: FixedStep) => () => {
                        if (!!step && fixedStep?.noSubSteps !== true) {
                            setSelectedStep(step);
                        } else {
                            console.log('No sub steps for this step');
                        }
                    }

                    const alreadyPassedStep = highestStepIndex >= index;
                    const capLetter = fixedStep?.title?.charAt(0)?.toUpperCase() ?? 'C'
                    const isRunningThisStep = (index === highestStepIndex+1);
                    const weHaveNewHighest = (highestStepIndex < index) && !!solvingEvent;

                    if (weHaveNewHighest) {
                        setHighestStepIndex(index);
                    }

                    if(highestStepIndex+1 >= fixedSteps.length) {
                        if(!finished){
                            setFinished(true);
                            // in 5sec reset the finished state
                        }
                    }

                    const classListItem = `
                        step z-1000 
                        
                        ${alreadyPassedStep ? 'step-primary' : ''}
                      ${isRunningThisStep ? 'step-primary step-loading' : ''} 
                      ${solvingEvent ? 'step-primary' : ''} 
                      ${((highestStepIndex >= index - 1) && (!fixedStep.noSubSteps) && (!!solvingEvent)) ? 'step-animate-popup cursor-pointer' : ''}
                      `

                    return (
                        <li
                            key={index}
                            data-content={capLetter}
                            onClick={() => openSubStepsForJob(solvingEvent, fixedStep)} // Fixing the onClick syntax
                            className={classListItem}
                        >
                            <div className={`font-medium d-flex-hor`}>

                                {/*<SinceDateCountdown*/}
                                {/*    sinceMs={stepStartDate}*/}
                                {/*/>*/}

                                {
                                    isRunningThisStep ? <span className="pr-1 loading loading-ring loading-md"></span> : <span className={`pr-1 ${alreadyPassedStep?'':'opacity-40'}`}>{fixedStep.emoji}</span>
                                }
                                {(index === highestStepIndex + 1) && fixedStep.title}
                                {(index < highestStepIndex + 1) && fixedStep.titlePast}
                                {(index > highestStepIndex + 1) && <span className="opacity-40">{fixedStep.titleFuture}</span>}
                            </div>
                        </li>
                    );


                })
            }

            <li key={fixedSteps.length} data-content="R" className={`step ${finished ? 'step-primary':''}`}>
                <div className={`font-medium ${finished ? 'step-primary':'opacity-40'}`}>
                    🎉 Done
                </div>
            </li>
        </ul>

        {/*Sub steps*/}
        <ul>
            {
                selectedStep && <div>
                    {/*Sub card showing details such as: createdAt (as human readable time), and sub steps as list.*/}
                    <div className="card bg-base-100 text-base-content radius-6">
                        <div className="card-body">
                            <div className="card-title">
                                {selectedStep.status}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </ul>

    </div>;
}