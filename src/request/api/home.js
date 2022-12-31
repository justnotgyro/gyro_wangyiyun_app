import service from "..";

// 拿到轮播图
export const getBanner = () => {
  return service({
    method: "GET",
    url: "/banner?type=2",
  });
};

// 拿到首页推荐歌单的数据
export const getMusicList = () => {
  return service({
    method: "GET",
    url: "/personalized?limit=10",
  });
};
