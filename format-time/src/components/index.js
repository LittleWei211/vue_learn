import Button from '../components/button'
console.log(Button);
const components = [
    Button
]
const install = (Vue) => {
    for(let key in components){
        Vue.component(components[key].name,components[key]);
    }
}
export default{
    install,
    Button
}
