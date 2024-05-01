

<script setup>
import {RouterLink} from 'vue-router'

</script>

<template>
    <nav class="flex fixed flex-row justify-between items-center
             shadow-md 
             h-[var(--navbar-height)] w-dvw
             pr-10
             bg-white opacity-100
             z-[3]">
        <span>
            <RouterLink to="/"><img class=" h-[7vh]" src="@/assets/logo/logo.png" alt="logo"/></RouterLink>
        </span>

        <span class="text-2xl .font-thin tracking-wide ">
            <ul id="navigation" class=" inline-flex flex-row justify-center items-center gap-10
             font-jersey ">
                <li>
                    <RouterLink class="link-hover" to="/">Home</RouterLink>
                </li>

                <li>
                    <RouterLink class="link-hover" to="/About">About</RouterLink>
                </li>

                <li>
                    <RouterLink class="link-hover" to="/Projects">Projects</RouterLink>
                </li>

            </ul>
        </span>



    </nav>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    #navigation {
        display: none;
    }
}


.link-hover.router-link-active {
    border-bottom: 2px solid black;
}
.link-hover:hover{
    border-bottom: 2px solid #3498db;
}

</style>