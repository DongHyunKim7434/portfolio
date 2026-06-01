// Youtube IFrame API를 비동기로 로드합니다.
var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// 포트폴리오 배경 영상 — 코딩 관련 영상으로 교체 권장
function onYouTubePlayerAPIReady() {
  new YT.Player('player', {
    videoId: 'f02mOEt11OQ',
    playerVars: {
      autoplay: true,
      loop: true,
      playlist: 'f02mOEt11OQ'
    },
    events: {
      onReady: function (event) {
        event.target.mute()
      }
    }
  })
}
