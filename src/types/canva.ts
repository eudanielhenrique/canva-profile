export interface CanvaProfileResponse {
  id: string;
  displayName: string;
  brandname: string;
  avatar: {
    sizes: {
      [key: string]: {
        url: string;
      }
    }
  };
  status: string;
  creationDate: string;
}
