import Button from '@material-ui/core/Button';
import axios from 'axios';


const CustomComponent = () => {
  const content = "Test page 1";

  async function onBtnClick ()  {
    const result = await axios(
      'http://localhost:3000/api/plugins/example',
    );
    console.log(result);
    alert(result?.data?.data);
  };

  return (
    <>
      <div>{content}</div>
      <Button variant="contained" color="primary" onClick={onBtnClick}>
        Primary
      </Button>
    </>
  );
};

export default CustomComponent;
