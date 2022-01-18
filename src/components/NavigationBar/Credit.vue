<template>
        <b-nav-item @click="credit">{{ $t('Credit') }}</b-nav-item>
</template>

<script>
// import localforage from 'localforage';
import Swal from "sweetalert2";
export default {
    name: "credit",
    methods: {
        credit() {
            Swal.fire({
                position: 'center',
                icon: 'info',
                width: '1000px',
                title: '-- Androz, snowflake107 - original s4d --\n-- 7coil - Discord blocks --\n-- Jose and mrredo - Preview 454 --\n-- frostzzone, RetroBTW, XL83, AHQ, henpokpok, AlexCdDg, Eruption - Preview 469 --\n-- oliver-moran, Jon Schlinkert - NPM Packages --\n-- JeremyGamer13 - JT Platform --',
                showConfirmButton: true,
                confirmButtonColor: '#A600FF',
                iconColor: '#A600FF'
            })
        },
    }
}
</script>