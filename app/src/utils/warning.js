import Alert from '@material-ui/lab/Alert';

export default function Warning(props) {
    const { severity, message } = props
    return <Alert severity={severity}>{message}</Alert>
    
}
