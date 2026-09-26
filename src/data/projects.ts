export type Project = {
    slug: string;
    description: string;
    languages: string[];
    role?: string;
};

export const githubUrl = (slug: string) => `https://github.com/${slug}`;

export const upstream: Project[] = [
    {
        slug: "nodejs/node",
        role: "Collaborator emeritus",
        description:
            "The JavaScript runtime. Bug fixes and runtime improvements from my years as a collaborator.",
        languages: ["C++", "JavaScript", "C"],
    },
    {
        slug: "fossasia/badgeyay",
        role: "GSoC 2018",
        description:
            "Badge generator for events with customisation and management features.",
        languages: ["Python", "JavaScript"],
    },
    {
        slug: "sukeesh/Jarvis",
        role: "Contributor",
        description:
            "Rule based personal assistant for the Linux and macOS terminal.",
        languages: ["Python"],
    },
];

export const tools: Project[] = [
    {
        slug: "yashLadha/sqsPeek",
        description: "Peek at messages in an SQS queue from the terminal.",
        languages: ["Go"],
    },
    {
        slug: "yashLadha/ssh-tail",
        description:
            "Tail log files on remote hosts over concurrent SSH sessions, with local or stdout sinks.",
        languages: ["Go"],
    },
    {
        slug: "yashLadha/prune-stale",
        description: "Prune stale remote branches from a repository.",
        languages: ["Go"],
    },
    {
        slug: "yashLadha/gnore",
        description: "Command line port of gitignore.io.",
        languages: ["Rust"],
    },
    {
        slug: "yashLadha/clean-dependa",
        description: "Close Dependabot pull requests in bulk, the lazy way.",
        languages: ["Rust"],
    },
    {
        slug: "yashLadha/go-moji",
        description: "Emojify your git commit messages.",
        languages: ["Go"],
    },
    {
        slug: "yashLadha/Parsy",
        description:
            "Messenger chatbot that extracts text from images with OCR.",
        languages: ["Python"],
    },
    {
        slug: "yashLadha/10-fast-fingers-hack",
        description: "Automated player for the 10fastfingers typing test.",
        languages: ["Python"],
    },
];
