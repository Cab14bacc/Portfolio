import { defineStore } from "pinia";
import data from "@/assets/projects.json"
import { uid } from "uid";
export const useProjectListStore = defineStore("ProjectList", {
    state: () => ({
        projectList: data.projects.map((project, index) => {
            return { ...project, id: uid() };
        }),
        tags: data.Tags,
    }),
    actions: {
    }
});