import { PROJECTS } from '../../projects';

export const HOME_PROJECT_IDS = ['zento-grenoble', 'le-binome-meylan', 'iut-lyon-1'];

export const homeProjects = HOME_PROJECT_IDS.flatMap((id) => {
  const project = PROJECTS.find((item) => item.id === id);
  return project ? [project] : [];
});
