import  { useState, useRef,useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const videoList = [
    { id: 1, title: 'Lesson 1', duration: '7:50', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'Lesson 2', duration: '11:43', src: 'https://www.w3schools.com/html/movie.mp4' },
    { id: 3, title: 'Lesson 3', duration: '13:23', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, title: 'Lesson 4', duration: '4:00', src: 'https://www.w3schools.com/html/movie.mp4' },
    { id: 5, title: 'Lesson 5', duration: '19:46', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];


const Web = () => {
    const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
    const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const localStorageKey = 'watchedVideos-Web';

    useEffect(() => {
        const savedWatchedVideos = localStorage.getItem(localStorageKey);
        if (savedWatchedVideos) {
            setWatchedVideos(JSON.parse(savedWatchedVideos));
        }
    }, [localStorageKey]);

    const handleVideoSelect = (video: { id: number; title: string; duration: string; src: string }) => {
        setSelectedVideo(video);
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // รีเซ็ตเวลาดูวิดีโอเมื่อเลือกวิดีโอใหม่
        }
    };

    const handleVideoEnd = () => {
        if (!watchedVideos.includes(selectedVideo.id)) {
            const updatedWatchedVideos = [...watchedVideos, selectedVideo.id];
            setWatchedVideos(updatedWatchedVideos);
            localStorage.setItem(localStorageKey, JSON.stringify(updatedWatchedVideos)); // บันทึกข้อมูลเมื่อวิดีโอจบ
        }
    };
    

  return (
    <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                Height: '100vh',
                padding: 4,
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' }, // เปลี่ยน flex direction เมื่อหน้าจอเล็ก
                overflow: 'hidden',
            }}
        >
            {/* กล่องใหญ่ฝั่งซ้าย */}
            <Box sx={{ flex: 3 }}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <video
                        ref={videoRef}
                        controls
                        style={{ width: '100%', height: '600px', borderRadius: '8px' }}
                        key={selectedVideo.src}
                        onEnded={handleVideoEnd} // เรียกฟังก์ชันเมื่อวิดีโอเล่นจบ
                    >
                        <source src={selectedVideo.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        {selectedVideo.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at temporibus assumenda, minus veniam officia corporis?
                    </Typography>
                </Paper>
            </Box>

            {/* กล่องใหญ่ฝั่งขวา */}
            <Box sx={{ flex: 1, width: '100%' }}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" color="primary">
                    Advanced JavaScript
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                    Take your JavaScript skills to the next level with this advanced course.
                    </Typography>
                    <Chip label="Web Development" variant="outlined" sx={{ mt: 2 }} />

                    <Typography variant="h6" sx={{ mt: 4 }}>
                        Lessons in this class
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        56:42
                    </Typography>

                    <List>
                        {videoList.map((video) => (
                            <ListItem key={video.id} disablePadding>
                                <ListItemButton
                                    onClick={() => handleVideoSelect(video)}
                                    selected={selectedVideo.id === video.id}
                                >
                                    {watchedVideos.includes(video.id) ? (
                                        <CheckCircleIcon sx={{ color: 'green', marginRight: 2 }} />
                                    ) : (
                                        <AccessTimeIcon sx={{ marginRight: 2 }} />
                                    )}
                                    <ListItemText
                                        primary={video.title}
                                        secondary={video.duration}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Box>
  )
}

export default Web