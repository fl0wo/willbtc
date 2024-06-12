import {NextApiRequest} from "next";

export const isNotEmpty = (value: any) => {
    return value !== undefined && value !== null && value !== "" && (Array.isArray(value) ? value.length > 0 : true);
}

export function countWords(formElement: string) {
    return formElement.split(/\s/).filter(function (str) {
        return str !== '';
    }).length;
}

export const buffer = async (req: NextApiRequest): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        req.on('error', reject);
    });
};

export const orThrow = <T>(value: T, message: string):NonNullable<T> => {
    if (!isNotEmpty(value)) {
        throw new Error(message);
    }

    return value as NonNullable<T>;
}

export const removeId = (obj: any) => {
    const { id, ...rest } = obj;
    return rest;
}

// use spread operator in the arguments
export const omit = (obj: any, ...keys: string[]) => {
    const copy = { ...obj };
    keys.forEach(key => delete copy[key]);
    return copy;
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 *  Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

// export function collect<T>(values: Iterable<T>): T[] {
//     const result = [];
//     for (const value of values) {
//         result.push(value);
//     }
//     return result;
// }

export async function collectAsync<T>(values: AsyncIterable<T>): Promise<T[]> {
    const result = [];
    for await (const value of values) {
        result.push(value);
    }
    return result;
}

export function equalIgnoreCase(a: string, b: string) {
    return a.toLowerCase() === b.toLowerCase();
}

export function logGH(msg: string) {
    console.log(`[GITHUB] ${msg}`);
}

export function removeDuplicatesArrayByKey<T>(array: T[], key: keyof T) {
    // use set
    return Array.from(
        new Set(array.map(
            (v) => v[key])
        )
    ).map((key) => array.find((v) => (v as any)[key] === key))
        .filter(el=>!!el) as NonNullable<T[]>
}

export function hasCredits(user: any, count: number) {
    return !!user && (user?.credits??0) >= count;
}

export const now = () => new Date().getTime();
export const days = (days: number) => days * 24 * 60 * 60 * 1000;
export const hours = (hours: number) => hours * 60 * 60 * 1000;
export const minutes = (minutes: number) => minutes * 60 * 1000;