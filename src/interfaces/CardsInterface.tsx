export interface CardlistData {
  has_more: boolean;
  total_cards: number;
  data: CardData[];
}

export interface CardData {
  id: string;
  length: number;
  name: string;
  image_uris?: {
    normal: string;
  };
  card_faces?: [
    {
      image_uris: {
        normal: string;
      };
    }
  ];
}
