export type GHEvent = {
    zen: string
    hook_id: number
    action?: "created" | "deleted" | "queued" | "labeled" | "unlabeled" | "locked" | "completed" | "in_progress"
} & GHEventRepository & GHEventOrganization & GHEventSender & GHEventWorkflowJob & GHEventHook & GHEventWorkflowRun & GHEventWorkflowCheckRun

export type GHEventHook = {
    hook?: {
        type: string
        id: number
        name: string
        active: boolean
        events: Array<string>
        config: {
            content_type: string
            insecure_ssl: string
            secret: string
            url: string
        }
        updated_at: string
        created_at: string
        url: string
        test_url: string
        ping_url: string
        deliveries_url: string
        last_response: {
            code: any
            status: string
            message: any
        }
    }
}

export type GHEventWorkflowJob = {
    workflow_job: {
        id: number
        run_id: number
        workflow_name: string
        head_branch: string
        run_url: string
        run_attempt: number
        node_id: string
        head_sha: string
        url: string
        html_url: string
        status: "completed" | "in_progress" | "queued" | "requested" | "waiting" | "created"
        conclusion: "success" | "failure"
        created_at: string
        started_at: string
        completed_at: string
        name: string
        steps: Array<{
            name: string
            status: string
            conclusion?: string
            number: number
            started_at: string
            completed_at?: string
        }>
        check_run_url: string
        labels: Array<string>
        runner_id: number
        runner_name: string
        runner_group_id: number
        runner_group_name: string
    }
}

export type GHEventRepository = {
    repository: {
        id: number
        node_id: string
        name: string
        full_name: string
        private: boolean
        owner: {
            login: string
            id: number
            node_id: string
            avatar_url: string
            gravatar_id: string
            url: string
            html_url: string
            followers_url: string
            following_url: string
            gists_url: string
            starred_url: string
            subscriptions_url: string
            organizations_url: string
            repos_url: string
            events_url: string
            received_events_url: string
            type: string
            site_admin: boolean
        }
        html_url: string
        description: string
        fork: boolean
        url: string
        forks_url: string
        keys_url: string
        collaborators_url: string
        teams_url: string
        hooks_url: string
        issue_events_url: string
        events_url: string
        assignees_url: string
        branches_url: string
        tags_url: string
        blobs_url: string
        git_tags_url: string
        git_refs_url: string
        trees_url: string
        statuses_url: string
        languages_url: string
        stargazers_url: string
        contributors_url: string
        subscribers_url: string
        subscription_url: string
        commits_url: string
        git_commits_url: string
        comments_url: string
        issue_comment_url: string
        contents_url: string
        compare_url: string
        merges_url: string
        archive_url: string
        downloads_url: string
        issues_url: string
        pulls_url: string
        milestones_url: string
        notifications_url: string
        labels_url: string
        releases_url: string
        deployments_url: string
        created_at: string
        updated_at: string
        pushed_at: string
        git_url: string
        ssh_url: string
        clone_url: string
        svn_url: string
        homepage: any
        size: number
        stargazers_count: number
        watchers_count: number
        language: string
        has_issues: boolean
        has_projects: boolean
        has_downloads: boolean
        has_wiki: boolean
        has_pages: boolean
        has_discussions: boolean
        forks_count: number
        mirror_url: any
        archived: boolean
        disabled: boolean
        open_issues_count: number
        license: {
            key: string
            name: string
            spdx_id: string
            url: string
            node_id: string
        }
        allow_forking: boolean
        is_template: boolean
        web_commit_signoff_required: boolean
        topics: Array<any>
        visibility: string
        forks: number
        open_issues: number
        watchers: number
        default_branch: string
        custom_properties: {}
    }
}

export type GHEventOrganization = {
    organization?: {
        login: string
        id: number
        node_id: string
        url: string
        repos_url: string
        events_url: string
        hooks_url: string
        issues_url: string
        members_url: string
        public_members_url: string
        avatar_url: string
        description: string
    }
}

export type GHEventSender = {
    sender?: {
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
    }
}

export type GHEventWorkflowRun = {
    workflow_run?: {
        id: number
        name: string
        node_id: string
        head_branch: string
        head_sha: string
        path: string
        display_title: string
        run_number: number
        event: string
        status: string
        conclusion: string
        workflow_id: number
        check_suite_id: number
        check_suite_node_id: string
        url: string
        html_url: string
        pull_requests: Array<any>
        created_at: string
        updated_at: string
        actor: {
            login: string
            id: number
            node_id: string
            avatar_url: string
            gravatar_id: string
            url: string
            html_url: string
            followers_url: string
            following_url: string
            gists_url: string
            starred_url: string
            subscriptions_url: string
            organizations_url: string
            repos_url: string
            events_url: string
            received_events_url: string
            type: string
            site_admin: boolean
        }
        run_attempt: number
        referenced_workflows: Array<any>
        run_started_at: string
        triggering_actor: {
            login: string
            id: number
            node_id: string
            avatar_url: string
            gravatar_id: string
            url: string
            html_url: string
            followers_url: string
            following_url: string
            gists_url: string
            starred_url: string
            subscriptions_url: string
            organizations_url: string
            repos_url: string
            events_url: string
            received_events_url: string
            type: string
            site_admin: boolean
        }
        jobs_url: string
        logs_url: string
        check_suite_url: string
        artifacts_url: string
        cancel_url: string
        rerun_url: string
        previous_attempt_url: any
        workflow_url: string
        head_commit: {
            id: string
            tree_id: string
            message: string
            timestamp: string
            author: {
                name: string
                email: string
            }
            committer: {
                name: string
                email: string
            }
        }
        repository: {
            id: number
            node_id: string
            name: string
            full_name: string
        private: boolean
            owner: {
                login: string
                id: number
                node_id: string
                avatar_url: string
                gravatar_id: string
                url: string
                html_url: string
                followers_url: string
                following_url: string
                gists_url: string
                starred_url: string
                subscriptions_url: string
                organizations_url: string
                repos_url: string
                events_url: string
                received_events_url: string
                type: string
                site_admin: boolean
            }
            html_url: string
            description: string
            fork: boolean
            url: string
            forks_url: string
            keys_url: string
            collaborators_url: string
            teams_url: string
            hooks_url: string
            issue_events_url: string
            events_url: string
            assignees_url: string
            branches_url: string
            tags_url: string
            blobs_url: string
            git_tags_url: string
            git_refs_url: string
            trees_url: string
            statuses_url: string
            languages_url: string
            stargazers_url: string
            contributors_url: string
            subscribers_url: string
            subscription_url: string
            commits_url: string
            git_commits_url: string
            comments_url: string
            issue_comment_url: string
            contents_url: string
            compare_url: string
            merges_url: string
            archive_url: string
            downloads_url: string
            issues_url: string
            pulls_url: string
            milestones_url: string
            notifications_url: string
            labels_url: string
            releases_url: string
            deployments_url: string
        }
        head_repository: {
            id: number
            node_id: string
            name: string
            full_name: string
        private: boolean
            owner: {
                login: string
                id: number
                node_id: string
                avatar_url: string
                gravatar_id: string
                url: string
                html_url: string
                followers_url: string
                following_url: string
                gists_url: string
                starred_url: string
                subscriptions_url: string
                organizations_url: string
                repos_url: string
                events_url: string
                received_events_url: string
                type: string
                site_admin: boolean
            }
            html_url: string
            description: string
            fork: boolean
            url: string
            forks_url: string
            keys_url: string
            collaborators_url: string
            teams_url: string
            hooks_url: string
            issue_events_url: string
            events_url: string
            assignees_url: string
            branches_url: string
            tags_url: string
            blobs_url: string
            git_tags_url: string
            git_refs_url: string
            trees_url: string
            statuses_url: string
            languages_url: string
            stargazers_url: string
            contributors_url: string
            subscribers_url: string
            subscription_url: string
            commits_url: string
            git_commits_url: string
            comments_url: string
            issue_comment_url: string
            contents_url: string
            compare_url: string
            merges_url: string
            archive_url: string
            downloads_url: string
            issues_url: string
            pulls_url: string
            milestones_url: string
            notifications_url: string
            labels_url: string
            releases_url: string
            deployments_url: string
        }
    }
}

export type GHEventWorkflowCheckRun = {
    check_run?: {
        id: number
        name: string
        node_id: string
        head_sha: string
        external_id: string
        url: string
        html_url: string
        details_url: string
        status: string
        conclusion: "success" | "failure"
        started_at: string
        completed_at: string
        output: {
            title: any
            summary: any
            text: any
            annotations_count: number
            annotations_url: string
        }
        check_suite: {
            id: number
            node_id: string
            head_branch: string
            head_sha: string
            status: string
            conclusion: string
            url: string
            before: string
            after: string
            pull_requests: Array<any>
            app: Array<string>
            created_at: string
            updated_at: string
        }
        app: {
            id: number
            slug: string
            node_id: string
            owner: Array<string>
            name: string
            description: string
            external_url: string
            html_url: string
            created_at: string
            updated_at: string
            permissions: Array<string>
            events: Array<string>
        }
        pull_requests: Array<any>
    }
}
