'use client';

import { AuthUser } from "@/model/user";
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from "./ui/Button";
import { useState } from "react";

type Props = {
    user: AuthUser;
};

export default function NewPost({user}: Props) {

    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File>();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
            console.log(files[0]);
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        if (e.type === 'dragenter') {
            setDragging(true);
        }
        else if (e.type === 'dragleave') {
            setDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        setDragging(false);
        const files = e.dataTransfer?.files;
        if (files && files[0]) {
            setFile(files[0]);
            console.log(files[0]);
        }
    }


    return (
        <section>
            <PostUserAvatar
                image={user.image ?? ''} 
                username={user.username}
            />
            <form>
                <input
                    className="hidden" 
                    name='input'
                    id='input-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
                />
                <label 
                    htmlFor="input-upload"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <FilesIcon />
                    <p>사진을 끌어다 놓거나 클릭하세요</p>
                </label>
                <textarea 
                    name='text' 
                    id='input-text' 
                    required rows={10} 
                    placeholder={'문구를 입력하세요...'} 
                />
                <Button 
                    text='공유하기'
                    onClick={() => {}}
                />
            </form>
        </section>
    )
}