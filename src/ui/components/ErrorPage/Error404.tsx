import React from 'react';
import s from '../ErrorPage/Error404.module.css'

export const Error404 = () => {
    return (
        <div className={s.notfound}>
            <div className={s.notfound}>
                <div className={s.notfound404}>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <a href="#">Homepage</a>
            </div>
        </div>
    )
}