import { useState, useEffect, useCallback } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ContentRow from "@/components/ContentRow";
import { Media } from "@/utils/types";
import {
  getBasedOnTrueStories,
  getActionMovies,
  getComedyMovies,
  getDramaMovies,
  getThrillerMovies,
  getSciFiMovies,
  getHorrorMovies,
  getRomanceMovies,
  getAnimationMovies,
  getFamilyMovies,
  getDocumentaryMovies,
  getMysteryMovies,
  getFantasyMovies,
  getMoviesForKids,
  getHollywoodMovies,
  getBollywoodMovies,
} from "@/utils/api";

const SecondaryContent = () => {
  const [content, setContent] = useState<{
    basedOnTrueStories: Media[];
    actionMovies: Media[];
    comedyMovies: Media[];
    dramaMovies: Media[];
    thrillerMovies: Media[];
    sciFiMovies: Media[];
    horrorMovies: Media[];
    romanceMovies: Media[];
    animationMovies: Media[];
    familyMovies: Media[];
    documentaryMovies: Media[];
    mysteryMovies: Media[];
    fantasyMovies: Media[];
    moviesForKids: Media[];
    hollywoodMovies: Media[];
    bollywoodMovies: Media[];
  }>({
    basedOnTrueStories: [],
    actionMovies: [],
    comedyMovies: [],
    dramaMovies: [],
    thrillerMovies: [],
    sciFiMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    animationMovies: [],
    familyMovies: [],
    documentaryMovies: [],
    mysteryMovies: [],
    fantasyMovies: [],
    moviesForKids: [],
    hollywoodMovies: [],
    bollywoodMovies: [],
  });

  const {
    basedOnTrueStories,
    actionMovies,
    comedyMovies,
    dramaMovies,
    thrillerMovies,
    sciFiMovies,
    horrorMovies,
    romanceMovies,
    animationMovies,
    familyMovies,
    documentaryMovies,
    mysteryMovies,
    fantasyMovies,
    moviesForKids,
    hollywoodMovies,
    bollywoodMovies,
  } = content;

  const [actionPage, setActionPage] = useState(1);
  const [isLoadingMoreAction, setIsLoadingMoreAction] = useState(false);
  const [comedyPage, setComedyPage] = useState(1);
  const [isLoadingMoreComedy, setIsLoadingMoreComedy] = useState(false);
  const [dramaPage, setDramaPage] = useState(1);
  const [isLoadingMoreDrama, setIsLoadingMoreDrama] = useState(false);
  const [thrillerPage, setThrillerPage] = useState(1);
  const [isLoadingMoreThriller, setIsLoadingMoreThriller] = useState(false);
  const [sciFiPage, setSciFiPage] = useState(1);
  const [isLoadingMoreSciFi, setIsLoadingMoreSciFi] = useState(false);
  const [horrorPage, setHorrorPage] = useState(1);
  const [isLoadingMoreHorror, setIsLoadingMoreHorror] = useState(false);
  const [romancePage, setRomancePage] = useState(1);
  const [isLoadingMoreRomance, setIsLoadingMoreRomance] = useState(false);
  const [animationPage, setAnimationPage] = useState(1);
  const [isLoadingMoreAnimation, setIsLoadingMoreAnimation] = useState(false);
  const [familyPage, setFamilyPage] = useState(1);
  const [isLoadingMoreFamily, setIsLoadingMoreFamily] = useState(false);
  const [documentaryPage, setDocumentaryPage] = useState(1);
  const [isLoadingMoreDocumentary, setIsLoadingMoreDocumentary] =
    useState(false);
  const [mysteryPage, setMysteryPage] = useState(1);
  const [isLoadingMoreMystery, setIsLoadingMoreMystery] = useState(false);
  const [fantasyPage, setFantasyPage] = useState(1);
  const [isLoadingMoreFantasy, setIsLoadingMoreFantasy] = useState(false);

  const loadMoreAction = useCallback(async () => {
    if (isLoadingMoreAction) return;
    setIsLoadingMoreAction(true);
    const nextPage = actionPage + 1;
    const newMovies = await getActionMovies(nextPage);
    setContent(prev => ({
      ...prev,
      actionMovies: [...prev.actionMovies, ...newMovies],
    }));
    setActionPage(nextPage);
    setIsLoadingMoreAction(false);
  }, [actionPage, isLoadingMoreAction]);
  const actionLoadMoreRef = useInfiniteScroll(
    loadMoreAction,
    isLoadingMoreAction
  );

  const loadMoreComedy = useCallback(async () => {
    if (isLoadingMoreComedy) return;
    setIsLoadingMoreComedy(true);
    const nextPage = comedyPage + 1;
    const newMovies = await getComedyMovies(nextPage);
    setContent(prev => ({
      ...prev,
      comedyMovies: [...prev.comedyMovies, ...newMovies],
    }));
    setComedyPage(nextPage);
    setIsLoadingMoreComedy(false);
  }, [comedyPage, isLoadingMoreComedy]);
  const comedyLoadMoreRef = useInfiniteScroll(
    loadMoreComedy,
    isLoadingMoreComedy
  );

  const loadMoreDrama = useCallback(async () => {
    if (isLoadingMoreDrama) return;
    setIsLoadingMoreDrama(true);
    const nextPage = dramaPage + 1;
    const newMovies = await getDramaMovies(nextPage);
    setContent(prev => ({
      ...prev,
      dramaMovies: [...prev.dramaMovies, ...newMovies],
    }));
    setDramaPage(nextPage);
    setIsLoadingMoreDrama(false);
  }, [dramaPage, isLoadingMoreDrama]);
  const dramaLoadMoreRef = useInfiniteScroll(loadMoreDrama, isLoadingMoreDrama);

  const loadMoreThriller = useCallback(async () => {
    if (isLoadingMoreThriller) return;
    setIsLoadingMoreThriller(true);
    const nextPage = thrillerPage + 1;
    const newMovies = await getThrillerMovies(nextPage);
    setContent(prev => ({
      ...prev,
      thrillerMovies: [...prev.thrillerMovies, ...newMovies],
    }));
    setThrillerPage(nextPage);
    setIsLoadingMoreThriller(false);
  }, [thrillerPage, isLoadingMoreThriller]);
  const thrillerLoadMoreRef = useInfiniteScroll(
    loadMoreThriller,
    isLoadingMoreThriller
  );

  const loadMoreSciFi = useCallback(async () => {
    if (isLoadingMoreSciFi) return;
    setIsLoadingMoreSciFi(true);
    const nextPage = sciFiPage + 1;
    const newMovies = await getSciFiMovies(nextPage);
    setContent(prev => ({
      ...prev,
      sciFiMovies: [...prev.sciFiMovies, ...newMovies],
    }));
    setSciFiPage(nextPage);
    setIsLoadingMoreSciFi(false);
  }, [sciFiPage, isLoadingMoreSciFi]);
  const sciFiLoadMoreRef = useInfiniteScroll(loadMoreSciFi, isLoadingMoreSciFi);

  const loadMoreHorror = useCallback(async () => {
    if (isLoadingMoreHorror) return;
    setIsLoadingMoreHorror(true);
    const nextPage = horrorPage + 1;
    const newMovies = await getHorrorMovies(nextPage);
    setContent(prev => ({
      ...prev,
      horrorMovies: [...prev.horrorMovies, ...newMovies],
    }));
    setHorrorPage(nextPage);
    setIsLoadingMoreHorror(false);
  }, [horrorPage, isLoadingMoreHorror]);
  const horrorLoadMoreRef = useInfiniteScroll(
    loadMoreHorror,
    isLoadingMoreHorror
  );

  const loadMoreRomance = useCallback(async () => {
    if (isLoadingMoreRomance) return;
    setIsLoadingMoreRomance(true);
    const nextPage = romancePage + 1;
    const newMovies = await getRomanceMovies(nextPage);
    setContent(prev => ({
      ...prev,
      romanceMovies: [...prev.romanceMovies, ...newMovies],
    }));
    setRomancePage(nextPage);
    setIsLoadingMoreRomance(false);
  }, [romancePage, isLoadingMoreRomance]);
  const romanceLoadMoreRef = useInfiniteScroll(
    loadMoreRomance,
    isLoadingMoreRomance
  );

  const loadMoreAnimation = useCallback(async () => {
    if (isLoadingMoreAnimation) return;
    setIsLoadingMoreAnimation(true);
    const nextPage = animationPage + 1;
    const newMovies = await getAnimationMovies(nextPage);
    setContent(prev => ({
      ...prev,
      animationMovies: [...prev.animationMovies, ...newMovies],
    }));
    setAnimationPage(nextPage);
    setIsLoadingMoreAnimation(false);
  }, [animationPage, isLoadingMoreAnimation]);
  const animationLoadMoreRef = useInfiniteScroll(
    loadMoreAnimation,
    isLoadingMoreAnimation
  );

  const loadMoreFamily = useCallback(async () => {
    if (isLoadingMoreFamily) return;
    setIsLoadingMoreFamily(true);
    const nextPage = familyPage + 1;
    const newMovies = await getFamilyMovies(nextPage);
    setContent(prev => ({
      ...prev,
      familyMovies: [...prev.familyMovies, ...newMovies],
    }));
    setFamilyPage(nextPage);
    setIsLoadingMoreFamily(false);
  }, [familyPage, isLoadingMoreFamily]);
  const familyLoadMoreRef = useInfiniteScroll(
    loadMoreFamily,
    isLoadingMoreFamily
  );

  const loadMoreDocumentary = useCallback(async () => {
    if (isLoadingMoreDocumentary) return;
    setIsLoadingMoreDocumentary(true);
    const nextPage = documentaryPage + 1;
    const newMovies = await getDocumentaryMovies(nextPage);
    setContent(prev => ({
      ...prev,
      documentaryMovies: [...prev.documentaryMovies, ...newMovies],
    }));
    setDocumentaryPage(nextPage);
    setIsLoadingMoreDocumentary(false);
  }, [documentaryPage, isLoadingMoreDocumentary]);
  const documentaryLoadMoreRef = useInfiniteScroll(
    loadMoreDocumentary,
    isLoadingMoreDocumentary
  );

  const loadMoreMystery = useCallback(async () => {
    if (isLoadingMoreMystery) return;
    setIsLoadingMoreMystery(true);
    const nextPage = mysteryPage + 1;
    const newMovies = await getMysteryMovies(nextPage);
    setContent(prev => ({
      ...prev,
      mysteryMovies: [...prev.mysteryMovies, ...newMovies],
    }));
    setMysteryPage(nextPage);
    setIsLoadingMoreMystery(false);
  }, [mysteryPage, isLoadingMoreMystery]);
  const mysteryLoadMoreRef = useInfiniteScroll(
    loadMoreMystery,
    isLoadingMoreMystery
  );

  const loadMoreFantasy = useCallback(async () => {
    if (isLoadingMoreFantasy) return;
    setIsLoadingMoreFantasy(true);
    const nextPage = fantasyPage + 1;
    const newMovies = await getFantasyMovies(nextPage);
    setContent(prev => ({
      ...prev,
      fantasyMovies: [...prev.fantasyMovies, ...newMovies],
    }));
    setFantasyPage(nextPage);
    setIsLoadingMoreFantasy(false);
  }, [fantasyPage, isLoadingMoreFantasy]);
  const fantasyLoadMoreRef = useInfiniteScroll(
    loadMoreFantasy,
    isLoadingMoreFantasy
  );

  useEffect(() => {
    let cancelled = false;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const safeSetContent = (
      updater: (prev: typeof content) => typeof content
    ) => {
      if (!cancelled) {
        setContent(updater);
      }
    };

    const fetchAllContent = async () => {
      try {
        const trueStories = await getBasedOnTrueStories();
        safeSetContent(prev => ({ ...prev, basedOnTrueStories: trueStories }));

        await delay(400);

        const action = await getActionMovies(1);
        safeSetContent(prev => ({ ...prev, actionMovies: action }));

        await delay(400);

        const comedy = await getComedyMovies();
        safeSetContent(prev => ({ ...prev, comedyMovies: comedy }));

        await delay(400);

        const drama = await getDramaMovies();
        safeSetContent(prev => ({ ...prev, dramaMovies: drama }));

        await delay(400);

        const thriller = await getThrillerMovies();
        safeSetContent(prev => ({ ...prev, thrillerMovies: thriller }));

        await delay(400);

        const scifi = await getSciFiMovies();
        safeSetContent(prev => ({ ...prev, sciFiMovies: scifi }));

        await delay(400);

        const horror = await getHorrorMovies();
        safeSetContent(prev => ({ ...prev, horrorMovies: horror }));

        await delay(400);

        const romance = await getRomanceMovies();
        safeSetContent(prev => ({ ...prev, romanceMovies: romance }));

        await delay(400);

        const animation = await getAnimationMovies();
        safeSetContent(prev => ({ ...prev, animationMovies: animation }));

        await delay(400);

        const family = await getFamilyMovies();
        safeSetContent(prev => ({ ...prev, familyMovies: family }));

        await delay(400);

        const documentary = await getDocumentaryMovies();
        safeSetContent(prev => ({ ...prev, documentaryMovies: documentary }));

        await delay(400);

        const mystery = await getMysteryMovies();
        safeSetContent(prev => ({ ...prev, mysteryMovies: mystery }));

        await delay(400);

        const fantasy = await getFantasyMovies();
        safeSetContent(prev => ({ ...prev, fantasyMovies: fantasy }));

        await delay(400);

        const kids = await getMoviesForKids();
        safeSetContent(prev => ({ ...prev, moviesForKids: kids }));

        await delay(400);

        const hollywood = await getHollywoodMovies();
        safeSetContent(prev => ({ ...prev, hollywoodMovies: hollywood }));

        await delay(400);

        const bollywood = await getBollywoodMovies();
        safeSetContent(prev => ({ ...prev, bollywoodMovies: bollywood }));
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      }
    };

    fetchAllContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {basedOnTrueStories.length > 0 && (
        <ContentRow title="Based on True Stories" media={basedOnTrueStories} />
      )}

      {actionMovies.length > 0 && (
        <ContentRow
          title="Action"
          media={actionMovies}
          loadMoreRef={actionLoadMoreRef}
          isLoadingMore={isLoadingMoreAction}
        />
      )}

      {comedyMovies.length > 0 && (
        <ContentRow
          title="Comedy"
          media={comedyMovies}
          loadMoreRef={comedyLoadMoreRef}
          isLoadingMore={isLoadingMoreComedy}
        />
      )}

      {dramaMovies.length > 0 && (
        <ContentRow
          title="Drama"
          media={dramaMovies}
          loadMoreRef={dramaLoadMoreRef}
          isLoadingMore={isLoadingMoreDrama}
        />
      )}

      {thrillerMovies.length > 0 && (
        <ContentRow
          title="Thriller"
          media={thrillerMovies}
          loadMoreRef={thrillerLoadMoreRef}
          isLoadingMore={isLoadingMoreThriller}
        />
      )}

      {sciFiMovies.length > 0 && (
        <ContentRow
          title="Sci-Fi"
          media={sciFiMovies}
          loadMoreRef={sciFiLoadMoreRef}
          isLoadingMore={isLoadingMoreSciFi}
        />
      )}

      {horrorMovies.length > 0 && (
        <ContentRow
          title="Horror"
          media={horrorMovies}
          loadMoreRef={horrorLoadMoreRef}
          isLoadingMore={isLoadingMoreHorror}
        />
      )}

      {romanceMovies.length > 0 && (
        <ContentRow
          title="Romance"
          media={romanceMovies}
          loadMoreRef={romanceLoadMoreRef}
          isLoadingMore={isLoadingMoreRomance}
        />
      )}

      {animationMovies.length > 0 && (
        <ContentRow
          title="Animation"
          media={animationMovies}
          loadMoreRef={animationLoadMoreRef}
          isLoadingMore={isLoadingMoreAnimation}
        />
      )}

      {familyMovies.length > 0 && (
        <ContentRow
          title="Family"
          media={familyMovies}
          loadMoreRef={familyLoadMoreRef}
          isLoadingMore={isLoadingMoreFamily}
        />
      )}

      {documentaryMovies.length > 0 && (
        <ContentRow
          title="Documentary"
          media={documentaryMovies}
          loadMoreRef={documentaryLoadMoreRef}
          isLoadingMore={isLoadingMoreDocumentary}
        />
      )}

      {mysteryMovies.length > 0 && (
        <ContentRow
          title="Mystery"
          media={mysteryMovies}
          loadMoreRef={mysteryLoadMoreRef}
          isLoadingMore={isLoadingMoreMystery}
        />
      )}

      {fantasyMovies.length > 0 && (
        <ContentRow
          title="Fantasy"
          media={fantasyMovies}
          loadMoreRef={fantasyLoadMoreRef}
          isLoadingMore={isLoadingMoreFantasy}
        />
      )}

      {moviesForKids.length > 0 && (
        <ContentRow title="Movies for Kids" media={moviesForKids} />
      )}

      {hollywoodMovies.length > 0 && (
        <ContentRow title="Hollywood" media={hollywoodMovies} />
      )}

      {bollywoodMovies.length > 0 && (
        <ContentRow title="Bollywood" media={bollywoodMovies} />
      )}
    </>
  );
};

export default SecondaryContent;