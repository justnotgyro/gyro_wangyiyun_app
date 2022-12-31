import service from "..";

// 这里的结果包括了歌单里面的所有歌曲
export const getPlayList = (id) => {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${id}`,
  });
};

export const getDefaultSong = () => {
  return service({
    method: "GET",
    url: `/song/detail?id=1907443034`,
  });
};

export const getDefaultLyrics = (id) => {
  return service({
    method: "GET",
    url: `/lyric?id=${id}`,
  });
};

export const getSearchResult = (keyword) => {
  return service({
    method: "GET",
    url: `/cloudsearch?keywords=${keyword}`,
  });
};
