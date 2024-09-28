import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

// Interface สำหรับข้อมูลจาก API
interface Courses {
    category: string;
    description: string;
    id: number;
    name: string;
}

const courseImages: { [key: number]: string } = {
    1: 'https://ciracollege.com/wp-content/uploads/2020/11/How-to-Learn-Python.jpg',
    2: 'https://www.sipexe.com/assets/courses/Adavaced_JavaScript.png',
    3: 'https://www.somkiat.cc/wp-content/uploads/2022/07/machine-learning-768x470.jpg',
    4: 'https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science-p-800.jpg',
};

const Callapi = () => {
    const [courses, setCourses] = useState<Courses[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All'); // สถานะสำหรับเก็บหมวดหมู่ที่เลือก
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://20e8dc73-f1bb-47f3-818b-ab1948c347b0-00-3dokbee55pkle.pike.replit.dev/courses')
            .then((response) => {
                setCourses(response.data);
                setFilteredCourses(response.data); // ตั้งค่าเริ่มต้นให้แสดงคอร์สทั้งหมด
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    const filterByCategory = (category: string) => {
        setSelectedCategory(category); // ตั้งค่า category ที่เลือก
        if (category === 'All') {
            setFilteredCourses(courses); // แสดงคอร์สทั้งหมด
        } else {
            const filtered = courses.filter((course) => course.category === category);
            setFilteredCourses(filtered); // แสดงเฉพาะคอร์สที่ตรงกับ category
        }
    };

    const handleCardClick = (id: number) => {
        // ใช้ id ในการนำทาง
        const courseRoutes: { [key: number]: string } = {
            1: '/course/python',
            2: '/course/web',
            3: '/course/machine',
            4: '/course/data'
        };
        navigate(courseRoutes[id] || '/'); // ถ้า id ไม่ตรง ให้ไปที่หน้าแรก
    };

    

    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            <div className='App'>
                {/* ปุ่มกรองหมวดหมู่ */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="outlined" onClick={() => filterByCategory('All')}>
                        All
                    </Button>
                    <Button variant="outlined" onClick={() => filterByCategory('Programming Fundamentals')}>
                        Programming Fundamentals
                    </Button>
                    <Button variant="outlined" onClick={() => filterByCategory('Web Development')}>
                        Web Development
                    </Button>
                    <Button variant="outlined" onClick={() => filterByCategory('Machine Learning')}>
                        Machine Learning
                    </Button>
                    <Button variant="outlined" onClick={() => filterByCategory('Data Science')}>
                        Data Science
                    </Button>
                </Box>

                {/* การ์ดแสดงผลตามหมวดหมู่ */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 4,
                        width: '100%',
                        padding: 4,
                    }}
                >
                    {filteredCourses.map((course: Courses) => (
                        <Card
                            key={course.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // เพิ่มเงาให้การ์ด
                                borderRadius: '12px', // เพิ่มความโค้งมนให้กับการ์ด
                                transition: 'transform 0.2s ease-in-out', // ทำให้การ์ดมีแอนิเมชันเมื่อ hover
                                '&:hover': {
                                    transform: 'scale(1.05)', // ขยายการ์ดเมื่อ hover
                                },
                            }}
                        >
                            <CardActionArea
                                sx={{ flexGrow: 1 }}
                                onClick={() => handleCardClick(course.id)}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <img
                                        src={courseImages[course.id] || 'https://via.placeholder.com/300x150.png?text=No+Image'} // ใช้รูปภาพที่แตกต่างกันตาม id ของคอร์ส
                                        alt={course.name}
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            objectFit: 'cover',
                                            borderRadius: '12px 12px 0 0',
                                        }}
                                    />
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
                                        {course.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                                        {course.description}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Chip label={course.category} variant="outlined" sx={{ p: 2 }} />
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </div>
        </Container>
    );
};

export default Callapi;