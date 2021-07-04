import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {userLogOut} from "../../services";

const Main = ({email}) => {

    return (
        <div className={'main-wrap'}>
            <div className={'header'}>
                <div className={'button-group'}>
                    <div className={'wrap colored'}>
                        <div className={'background'}/>
                        <Link to={'/'} className={'header-links'}>
                            Листинг товаров
                        </Link>
                    </div>
                    <div className={'wrap'}>
                        <div className={'background'}/>
                        <Link to={'/property-list'} className={'header-links'}>
                            Листинг проперти
                        </Link>
                    </div>
                </div>
                <div className={'button-group'}>
                    <div className={'user-name'}>Пользователь (E-mail): {email}</div>
                    <div className={'button-log-out-wrap'}>
                        <Button
                            className={'button-log-out'}
                            variant={'warning'}
                            onClick={userLogOut}
                        >
                            Выйти
                        </Button>
                    </div>
                </div>
            </div>
            <div className={'content'}>

            </div>
        </div>
    )
}

export default Main;