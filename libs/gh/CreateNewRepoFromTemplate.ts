export interface CreateNewRepoFromTemplate {
    organization: string,
    template_owner: string,
    template_repo: string,
    repo: string,
    secrets: {
        [name: string]: string
    }
}