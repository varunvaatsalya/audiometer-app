import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}

export async function setUpPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } catch (error) {
    isSetup = false;
  } finally {
    return isSetup;
  }
}

export async function addTrack(listData){
    await TrackPlayer.add(listData);    
    await TrackPlayer.setRepeatMode(RepeatMode.Track);
}
