import ReCAPTCHA from "react-google-recaptcha";

const Recap = (props) =>{ 
    async function onChange(value) {
        if (value!=null){
            props.parentCallback();
        }
    }
    return (
        
        <ReCAPTCHA
        onChange={onChange}
            sitekey="6LfIw60aAAAAAOpj2aWuWnn_1uLyzg0rU3OVjH3K"
        />
        
)
}
export default Recap