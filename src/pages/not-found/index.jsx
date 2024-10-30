import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ReloadOutlined, HomeOutlined
} from "@ant-design/icons";
import IconNotFound from 'assets/images/png/notfound.png'
import { useSelector } from "react-redux";

const index = () => {
  const { currentLangCode } = useSelector(state => state.system)
  const navigate = useNavigate();
  return (
    <div className="w-full bg-contain bg-no-repeat bg-left h-[100vh]" style={{ backgroundImage: "url('/src/assets/images/png/bg.png')" }}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[400px] h-[400px] relative">
          <img src={IconNotFound} className="w-full h-full absolute object-contain" alt="" />
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <Button onClick={() => navigate("/")} type="ghost" className="cursor-pointer w-[240px] h-[40px] rounded-[4px] bg-[#6200EE] text-white">
            <HomeOutlined />
            {
              currentLangCode === "uz" ? "Bosh sahifa" : "Домашняя страница"
            }
          </Button>
          <Button onClick={() => window.location.reload()} type="ghost" className="cursor-pointer w-[240px] h-[40px] rounded-[4px] border border-solid border-[#6200EE] text-[#6200EE] bg-white">
            <ReloadOutlined />
            {
              currentLangCode === "uz" ? "Sahifani yangilash" : "Обновить страницу"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};
export default index;
