import { useQuery } from '@tanstack/react-query';

const fetchBreedList = async ({ queryKey }) => {
  const [, animal] = queryKey;

  if (!animal) return [];
  const response = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
  return response.json();
};

const useBreedList = (animal) => {
  return useQuery(['breeds', animal], fetchBreedList);
};

export default useBreedList;