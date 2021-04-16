import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://bucket-axes.s3.ap-east-1.amazonaws.com/y3midterm/AlvinL/index.html">
          AlvinLeung
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }