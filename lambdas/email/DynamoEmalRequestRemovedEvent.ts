export interface DynamoEmailRequestRemovedEvent {
    /*
    {
            "eventID": "766a5ce7e2d1482973aa1374357bfdff",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1717020330,
                "Keys": {
                    "id": {
                        "S": "7eb3f0ad-2daa-444f-865b-103ac2838a1f"
                    }
                },
                "OldImage": {
                    "id": {
                        "S": "7eb3f0ad-2daa-444f-865b-103ac2838a1f"
                    },
                    "sendAt": {
                        "N": "1718746236.377"
                    },
                    "templateId": {
                        "S": "onboarding_nopay_5"
                    },
                    "email": {
                        "S": "sabaniflorian@gmail.com"
                    },
                    "name": {
                        "S": "Florian Sabani"
                    }
                },
                "SequenceNumber": "500000000090458926404",
                "SizeBytes": 146,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:992382510316:table/blogfast-flo-EmailSchedulerDbTable/stream/2024-05-29T19:59:50.045"
        }
     */

    eventID: string;
    eventName: string;
    eventVersion: string;

    eventSource: string;
    awsRegion: string;
    dynamodb: {
        ApproximateCreationDateTime: number;
        Keys: {
            id: {
                S: string;
            }
        };
        OldImage: {
            id: {
                S: string;
            };
            sendAt: {
                N: string;
            };
            templateId: {
                S: string;
            };
            email: {
                S: string;
            },
            name: {
                S: string;
            }
        };
        SequenceNumber: string;
        SizeBytes: number;
        StreamViewType: string;
    };
    eventSourceARN: string;
}