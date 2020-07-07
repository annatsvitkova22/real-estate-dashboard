import { Estate, AuthUser } from '../../models';

export interface AppState {
    estatePage: {
        estates: Estate[]
    };
    idCounterPage: {
        id: number;
    };
    authPage: {
        user: AuthUser;
        isAuth: boolean;
    };
}
