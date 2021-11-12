import Button from "@material-ui/core/Button";
import axios from "axios";
// You can import Insight src by alias name `insight_src`, such as following.
import { useNavigationHook } from "insight_src/hooks/Navigation";
import { ALL_ROUTER_TYPES } from "insight_src/router/Types";

const CustomComponent = () => {
  const content = "Test page 1";

  // Do call this hook, then the page title can correctlly show.
  useNavigationHook(ALL_ROUTER_TYPES.PLUGIN, { title: content });

  async function onBtnClick() {
    const result = await axios("http://localhost:3000/api/plugins/example");
    console.log(result);
    alert(result?.data?.data);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={onBtnClick}>
        Primary
      </Button>
    </>
  );
};

export default CustomComponent;
