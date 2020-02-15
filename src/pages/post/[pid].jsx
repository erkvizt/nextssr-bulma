import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';

import settings from '../../settings';

const Post = ({ errorCode, post }) => {
    if (errorCode) {
        return <Error statusCode={errorCode}></Error>
    }

    return (
        <Layout>
            Viewing post {post.title}
        </Layout>
    );
}

Post.getInitialProps = async ({res, err, query}) => {
    const fetchRes = await fetch(`${settings.API_URL}posts/${query.pid}`);
    const errorCode = fetchRes.status > 201 ? fetchRes.status : false
    if (errorCode) {
        res.statusCode = 404;
    }
    const json = await fetchRes.json();

    return { errorCode, post: json }
}

export default Post;