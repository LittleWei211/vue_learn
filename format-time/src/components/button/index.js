import Button from "../button/index.vue"
Button.install = (Vue) => {
    Vue.component(Button.name,Button);
}
export default Button;