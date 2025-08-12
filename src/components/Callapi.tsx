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
    2: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop',
    3: 'https://www.somkiat.cc/wp-content/uploads/2022/07/machine-learning-768x470.jpg',
    4: 'https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science-p-800.jpg',
};

const Callapi = () => {
    const [courses, setCourses] = useState<Courses[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All'); // สถานะสำหรับเก็บหมวดหมู่ที่เลือก
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // ฟังก์ชันสำหรับโหลดข้อมูลคอร์ส
    const loadCourses = () => {
        setLoading(true);
        setError('');
        
        // ใช้ API ที่เสถียรกว่า หรือใช้ mock data ถ้า API ไม่ทำงาน
        axios
            .get('https://20e8dc73-f1bb-47f3-818b-ab1948c347b0-00-3dokbee55pkle.pike.replit.dev/courses')
            .then((response) => {
                setCourses(response.data);
                setFilteredCourses(response.data); // ตั้งค่าเริ่มต้นให้แสดงคอร์สทั้งหมด
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
                
                // ใช้ข้อมูลจำลองเมื่อ API ไม่ทำงาน
                const mockData = [
                    { id: 1, name: 'Python Programming', description: 'เรียนรู้การเขียนโปรแกรมด้วยภาษา Python ตั้งแต่พื้นฐานจนถึงขั้นสูง', category: 'Programming Fundamentals' },
                    { id: 2, name: 'Web Development', description: 'พัฒนาเว็บไซต์ด้วย HTML, CSS, JavaScript และ React', category: 'Web Development' },
                    { id: 3, name: 'Machine Learning', description: 'เรียนรู้การสร้างโมเดล Machine Learning และการประยุกต์ใช้งาน', category: 'Machine Learning' },
                    { id: 4, name: 'Data Science', description: 'วิเคราะห์ข้อมูลด้วยเครื่องมือและเทคนิคทางวิทยาศาสตร์ข้อมูล', category: 'Data Science' }
                ];
                
                // ถ้ามีข้อมูลจำลอง ไม่ต้องแสดงข้อความแจ้งเตือน
                if (mockData.length > 0) {
                    setCourses(mockData);
                    setFilteredCourses(mockData);
                    setLoading(false);
                    setError(''); // ล้างข้อความแจ้งเตือน
                } else {
                    setError('ไม่สามารถโหลดข้อมูลคอร์สได้ กรุณาลองใหม่อีกครั้ง');
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        loadCourses();
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
                {/* แสดงสถานะการโหลด */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <Typography variant="h6">กำลังโหลดข้อมูลคอร์ส...</Typography>
                    </Box>
                )}

                {/* แสดงข้อความแสดงข้อผิดพลาด */}
                {error && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                        <Typography variant="h6" color="error">{error}</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2 }}
                            onClick={loadCourses}
                        >
                            ลองใหม่อีกครั้ง
                        </Button>
                    </Box>
                )}

                {/* ปุ่มกรองหมวดหมู่ */}
                {!loading && (
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button 
                        variant={selectedCategory === 'All' ? "contained" : "outlined"} 
                        onClick={() => filterByCategory('All')}
                    >
                        All
                    </Button>
                    <Button 
                        variant={selectedCategory === 'Programming Fundamentals' ? "contained" : "outlined"} 
                        onClick={() => filterByCategory('Programming Fundamentals')}
                    >
                        Programming Fundamentals
                    </Button>
                    <Button 
                        variant={selectedCategory === 'Web Development' ? "contained" : "outlined"} 
                        onClick={() => filterByCategory('Web Development')}
                    >
                        Web Development
                    </Button>
                    <Button 
                        variant={selectedCategory === 'Machine Learning' ? "contained" : "outlined"} 
                        onClick={() => filterByCategory('Machine Learning')}
                    >
                        Machine Learning
                    </Button>
                    <Button 
                        variant={selectedCategory === 'Data Science' ? "contained" : "outlined"} 
                        onClick={() => filterByCategory('Data Science')}
                    >
                        Data Science
                    </Button>
                </Box>
                )}

                {/* การ์ดแสดงผลตามหมวดหมู่ */}
                {!loading && filteredCourses.length > 0 && (
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
                )}
                
                {/* แสดงข้อความเมื่อไม่มีคอร์สที่ตรงกับการกรอง */}
                {!loading && filteredCourses.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <Typography variant="h6">ไม่พบคอร์สที่ตรงกับหมวดหมู่ที่เลือก</Typography>
                    </Box>
                )}
            </div>
        </Container>
    );
};

export default Callapi;