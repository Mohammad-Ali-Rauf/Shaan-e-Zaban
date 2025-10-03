export interface LanguageStrings {
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    profile: string;
    logout: string;
    signIn: string;
    signUp: string;
  };
  navbar: {
    home: string;
    stories: string;
    learn: string;
    about: string;
    dashboard: string;
    contribute: string;
    writeStory: string;
    userProfile: string;
    viewProfile: string;
    memberSince: string;
  };
  auth: {
    email: string;
    password: string;
    name: string;
    userId: string;
    accountInfo: string;
    notSet: string;
    welcomeBack: string,
    signInDescription: string,
    joinPlatform: string,
    signUpDescription: string,
    emailPlaceholder: string,
    passwordPlaceholder: string,
    namePlaceholder: string,
    signingIn: string,
    creatingAccount: string,
    dontHaveAccount: string,
    alreadyHaveAccount: string,
    continueGuest: string,
    signIn: string;
    signUp: string;
    or: string,
    accountBenefitsTitle: string,
    accountBenefits: string[];
  };
  stories: {
    title: string;
    description: string;
    storyCollection: string;
    exploreCollection: string;
    writeStory: string;
    backToHome: string;
    totalStories: string;
    difficultyLevels: string;
    levelFilters: string[];
    beginner: string;
    intermediate: string;
    advanced: string;
    startReading: string;
    rating: string;
    noStoriesTitle: string;
    noStoriesDescription: string;
    writeFirstStory: string;
    tags: string;
    difficulty: string;
  },
  home: {
    heroDescription: string;
    startWriting: string;
    browseCollection: string;
    features: string[];
    whyLearnTitle: string;
    whyLearnDescription: string;
    featureCards: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    ctaTitle: string;
    ctaDescription: string;
    exploreStories: string;
    learnMore: string;
  };
  about: {
    title: string;
    header: string;
    introduction: string;
    problemStatement: string;
    quote: string;
    principlesTitle: string;
    principlesDescription: string;
    principles: Array<{
      title: string;
      description: string;
    }>;
    mission: string;
    urduCalligraphy: string;
    urduCalligraphyTranslation: string;
    ctaTitle: string;
    ctaDescription: string;
    startLearning: string;
    contribute: string;
  };
}

export type Language = 'en' | 'ur';