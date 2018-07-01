export interface Payment {
    id?: string;
    name?: string;
    gateway?: {
      payment?: string;
      id?: string;
      key?: string;
      salt?: string;
      user?: string;
      pass?: string;
    };
    applyFor?: {
      del?: boolean;
      pickUp?: boolean;
      tableRes?: boolean;
    };
  }
  
  export interface SelectFormVal {
    [index: number]: {
      label: string;
      value: string;
    };
  }
  export const payTypeList: SelectFormVal = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Stripe', value: 'Stripe' },
    { label: 'Adyen', value: 'Adyen' },
  ];
  