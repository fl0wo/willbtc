import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import apiClient from "@/libs/api";

export async function requestNewBlog(form:FormBotConfigurationType) {
    await apiClient.post('/bot/configure', form);
}

export async function deleteBlog(form:FormBotConfigurationType) {
    await apiClient.post(`/bot/delete`,form);
}


export async function askForDomain(urlSlug: string){
    return await apiClient.get(`/bot/available/${urlSlug}`);
}
