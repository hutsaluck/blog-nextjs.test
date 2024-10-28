import { useEffect, useState } from 'react';
import { Card, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {posts.map(post => (
                    <Card key={post.id} style={{ padding: '20px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}...</p>
                        <Button onClick={() => router.push(`/post/${post.id}`)}>Читати більше</Button>
                    </Card>

                ))}
            </div>
        </div>
    );
}
