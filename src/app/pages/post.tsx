import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // новий хук
import axios from 'axios';
import { Button } from '@nextui-org/react';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function PostDetail() {
    const [post, setPost] = useState<Post | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // отримуємо параметр id

    useEffect(() => {
        if (id) {
            axios
                .get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => setPost(response.data))
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Button onClick={() => window.history.back()}>Назад</Button>
        </div>
    );
}
