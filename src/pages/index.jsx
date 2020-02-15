import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import Layout from '../components/Layout/Layout';
import fetch from 'isomorphic-unfetch';

import settings from '../settings';

const Index = ({ errorCode, posts }) => {
    if (errorCode) {
        return <Error statusCode={errorCode}></Error>
    }

    return (
        <Layout>
            { posts && posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}
        </Layout>
    );
}

Index.getInitialProps = async ({res, err}) => {
    const fetchRes = await fetch(`${settings.API_URL}posts`);
    const errorCode = fetchRes.status > 201 ? fetchRes.status : false
    if (errorCode) {
        res.statusCode = 404;
    }
    const json = await fetchRes.json();

    return { errorCode, posts: json }
}

export default Index;