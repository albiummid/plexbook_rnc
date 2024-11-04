import {FirebaseDynamicLinksTypes} from '@react-native-firebase/dynamic-links';
import {ldbValues} from '../localDB';
import {urlHelper} from '../utils/helpers';
import {router} from './navigator';
import {useAuthState} from '../zustand';
import {api} from '../api';

export const visitLink = async ({
  sharerId,
  visitorId,
  contentKind,
  tmdbId,
}: {
  visitorId: string;
  sharerId: string;
  contentKind: string;
  tmdbId: number;
}) => {
  return api.post('/app/visit-link', {
    sharerId,
    visitorId,
    contentKind,
    tmdbId,
  });
};

export async function backgroundOrQuitHandler(
  link: FirebaseDynamicLinksTypes.DynamicLink | null,
) {
  useAuthState.setState({hasDeepLink: Boolean(link), isLoading: false});
  if (!ldbValues.getUserId() || !link?.url) return;

  const params = urlHelper.urlToParamObject(link?.url);
  const screens = {
    movie: 'movie_details',
    tv: 'series_details',
    person: 'person_details',
  };
  if (params.type === 'content') {
    if (!params.tmdbId || !params.contentKind) {
      console.log('Invalid share');
      return;
    }
    const routeName = screens[params?.contentKind];
    if (!routeName) return;
    await visitLink({...params, visitorId: ldbValues.getUserId()});
    router.reset(routeName, {
      id: params.id,
      contentKind: params?.contentKind,
    });
  } else if (params.type === 'tagContents') {
    router.reset('tag_contents', {
      tagId: params.tagId,
      contentKind: params.contentKind,
    });
  }
}

export async function foregroundHandler(
  link: FirebaseDynamicLinksTypes.DynamicLink | null,
) {
  useAuthState.setState({hasDeepLink: Boolean(link)});
  if (!ldbValues.getUserId() || !link) return;

  const params = urlHelper.urlToParamObject(link?.url);
  const screens = {
    movie: 'movie_details',
    tv: 'series_details',
    person: 'person_details',
  };
  await visitLink({...params, visitorId: ldbValues.getUserId()});
  if (params.type === 'content') {
    if (!params.tmdbId || !params.contentKind) {
      console.log('Invalid share');
      return;
    }
    const routeName = screens[params?.contentKind];
    if (!routeName) return;

    router.push(routeName, {
      id: params.tmdbId,
      contentKind: params?.contentKind,
    });
  } else if (params.type === 'tagContents') {
    router.push('tag_contents', {
      tagId: params.tagId,
      contentKind: params.contentKind,
    });
  }
}
