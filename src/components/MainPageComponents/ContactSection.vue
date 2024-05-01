<script setup>

const recaptchaScript = document.createElement("script");
recaptchaScript.setAttribute(
    "src",
    "https://web3forms.com/client/script.js"
);
document.head.appendChild(recaptchaScript);
</script>


<template>
    
    <div id="contact-section" class="bg-black text-white
    flex flex-col justify-evenly items-center
    h-[calc(80vh_-_var(--navbar-height))] min-h-[500px]">
        <h1 id="contact-title" class="font-jersey text-6xl text-center">Contact Form</h1>
        <div id="contact-container" class="flex flex-col justify-center items-center w-4/5 m-5 max-w-[800px]">
            <form method="post" id="contact" action="https://api.web3forms.com/submit" 
            class="flex flex-col justify-center items-start w-full">
                <input type="hidden" name="access_key" value="21f9c1ba-de10-4033-995e-1478d94d4c48">
                <label for="contact-email" id="contact-email-label"
                    class=" block w-full font-jersey text-3xl text-left">Email</label>
                <input name="contact-email" id="contact-email" type="email" placeholder="  Your email" required
                    class="block w-full mb-2 rounded-md text-black pl-1">

                <label for="contact-content" id="contact-content-label"
                    class="block w-full font-jersey text-3xl text-left">Content</label>
                <textarea name="contact-content" id="contact-content" type="text" rows="5" maxlength="500"
                    placeholder="  Things you want tell me :)" required class="pl-1 block w-full mb-2 rounded-md text-black"></textarea>
                <span class="h-captcha mb-2" data-captcha="true" ></span>
                <input id="contact-submit-button" type="submit" value="Submit" class=" bg-white block w-full 
                font-jersey text-3xl text-center text-black rounded-md pl-1">
                
            </form>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>