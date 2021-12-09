export function getCords() {
    if ('geolocation' in navigator) {
        console.log('availavle');
        navigator.geolocation.getCurrentPosition((pos) => {

            
        })
    }
}