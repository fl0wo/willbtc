import {BotType} from "@/libs/drizzle/models/BotType";
import {UserType} from "@/libs/drizzle/models/UserType";
import React, {useState} from "react";
import {tryFirstBlog} from "@/app/server-actions";
import {toast} from "react-hot-toast";
import {GetFirstBlogFreeBtn} from "@/app/dashboard/components/get-first-blog-free-btn";
import {TopicProvider} from "@/app/use/topic-provider";
import {TopicItem} from "@gomomento/sdk-web";
import {LiveWorkflowStatus} from "@/app/dashboard/components/live-workflow-status";
import {fixedSteps, isThisJobStillRunning} from "@/app/dashboard/steps/blogCreationSteps";

export function BlogCardOneGeneration(props: {
    cacheName: string,
    topicName: string,
    apiKey: string,
    bot: BotType,
    user: UserType,
}) {

    const isAMatchingJob = isThisJobStillRunning(props.bot.lastJob, fixedSteps)

    const [isTryingFirstBlog, setIsTryingFirstBlog] = useState(
        isAMatchingJob
    );
    const [openGenerateOneBlogButton, setOpenGenerateOneBlogButton] = useState(
        isAMatchingJob
    );

    const requestFirstBlogFree = async () => {
        setIsTryingFirstBlog(true);

        tryFirstBlog(props.bot)
            .then((canActivate) => {
                if (!canActivate) {
                    // show toast
                    toast.custom('Opps! Something went wrong, contact support', {
                        style: {
                            backgroundColor: '#333',
                            color: '#fff',
                        },
                        icon: '🚨',
                    });
                } else {
                    toast.success('First blog is being generated, it will take a few minutes.');
                    setOpenGenerateOneBlogButton(true);
                }
            })
            .catch((e) => {
                console.error('Error trying first blog:', e);
                toast.error('Error trying first blog');
            })
            .finally(() => {
                setIsTryingFirstBlog(false);
            });
    }

    return <div>
        <div className="collapse">
            <input defaultChecked={openGenerateOneBlogButton || !props.bot.lastJob} type="checkbox" className="peer"/>
            {/*TODO: if a job was already requested within 1h ago, show locked button */}
            <div
                className="collapse-title text-primary-content peer-checked:bg-primary peer-checked:text-white text-sm">
                <div>
                    {openGenerateOneBlogButton &&
                        <span>🤩 generating...</span>
                    }
                </div>

                <div>
                    {!openGenerateOneBlogButton && !!props.bot.lastJob &&
                        <span className="btn btn-block btn-ghost">👀 generate one blog now</span>
                    }
                </div>
            </div>
            <div

                className="collapse-content bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-white pl-2 pr-2 pb-10-important border-25rem">
                {
                    (!openGenerateOneBlogButton) &&
                    <GetFirstBlogFreeBtn
                        onClick={requestFirstBlogFree}
                        tryingFirstBlog={isTryingFirstBlog}/>
                }

                {openGenerateOneBlogButton &&
                    <div>
                        <TopicProvider
                            cacheName={props.cacheName}
                            topicName={props.topicName}
                            apiKey={props.apiKey}
                            onItem={(item: TopicItem) => {}}
                            onError={async (err, err2) => {}}
                        >
                            <LiveWorkflowStatus
                                bot={props.bot}
                                user={props.user}
                                hydrateLastJob={isAMatchingJob}
                            />
                        </TopicProvider>
                    </div>
                }
            </div>
        </div>
    </div>;
}