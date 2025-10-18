import Slider from '../components/Slider';
import Review from '../components/Review';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ name: '', review: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/reviews')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Ошибка загрузки отзывов:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.name.trim() || !reviewData.review.trim()) {
      alert('Заполните имя и отзыв!');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/reviews',
        reviewData
      );
      setReviews([res.data, ...reviews]);
      setReviewData({ name: '', review: '' });
      alert('Отзыв успешно отправлен!');
    } catch (err) {
      console.error('Ошибка отправки отзыва:', err);
      alert('Ошибка при отправке отзыва. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const displayedReviews = reviews.length > 0 ? reviews.slice(0, 3) : [];

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Описание */}
      <section className='text-center mb-8 space-y-8'>
        <div className='text-center z-10'>
          <h1 className='text-4xl font-bold text-amber-800 drop-shadow-2xl mb-2'>
            Кофейня
          </h1>
          <span
            className='
        block
        text-5xl font-extrabold
        text-transparent
        bg-clip-text
        bg-gradient-to-r from-amber-800 via-amber-500 to-yellow-300
        drop-shadow-2xl
      '
          >
            “Кофе и Книги”
          </span>
        </div>
        <p className='text-xl font-bold text-gray-800 leading-relaxed text-center max-w-2xl mx-auto'>
          Наша кофейня — это гармоничное пространство, где каждый гость может
          погрузиться в мир любимых книг за чашечкой ароматного кофе,
          наслаждаясь атмосферой спокойствия и умиротворения.
        </p>

        <div className='max-w-2xl mx-auto space-y-4'>
          <img
            src='/images/home_img2.jpg'
            alt='Кресла и книги'
            className='w-full h-64 object-cover rounded-lg shadow-md'
          />
          <p className='text-lg text-gray-700 leading-relaxed'>
            Уютные кресла, тщательно подобранная коллекция литературы и
            безупречный кофе создают особую атмосферу, где время словно
            замедляется, позволяя отвлечься от суеты и погрузиться в чтение.
          </p>
        </div>

        <img
          src='/images/home_img3.jpg'
          alt='Интерьер кофейни'
          className='mx-auto w-3/4 h-64 object-cover rounded-lg shadow-md'
        />
        <p className='max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed'>
          Мы создали идеальное место для тех, кто ценит интеллектуальный досуг:
          здесь можно не только насладиться великолепным кофе, но и провести
          время с пользой, листая страницы любимых книг в комфортной обстановке.
        </p>
      </section>

      {/* Слайдер */}
      <Slider />

      {/* Кнопки-призывы */}
      <section className='flex justify-center space-x-4 my-8 flex-wrap'>
        <Link to='/menu' className='btn-primary'>
          Посмотреть меню
        </Link>
        <Link to='/booking' className='btn-primary'>
          Забронировать столик
        </Link>
        <Link to='/contacts' className='btn-primary'>
          Контакты
        </Link>
      </section>

      {/* Отзывы */}
      <section className='my-8'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Отзывы клиентов</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {displayedReviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
          {displayedReviews.length === 0 && (
            <p className='text-center text-gray-500 col-span-full'>
              Отзывы загружаются или пока отсутствуют.
            </p>
          )}
        </div>

        {/* Форма отзыва */}
        <form
          onSubmit={handleSubmit}
          className='mt-8 max-w-md mx-auto space-y-4'
        >
          <input
            type='text'
            name='name'
            placeholder='Ваше имя'
            value={reviewData.name}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
            required
          />
          <textarea
            name='review'
            placeholder='Оставьте отзыв'
            value={reviewData.review}
            onChange={handleInputChange}
            className='w-full p-2 border rounded min-h-[100px]'
            required
          ></textarea>
          <button
            type='submit'
            className='btn-primary w-full disabled:opacity-50'
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </section>

      {/* Контакты */}
      <section className='text-center my-8'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Контакты</h2>
        <div className='space-y-3 text-gray-700 max-w-md mx-auto'>
          <p className='font-semibold'>
            Адрес: г. Калуга, ул. Автозаводская, 15
          </p>
          <p className='font-semibold'>
            Тел:{' '}
            <a href='tel:89561230005' className='text-blue-600 hover:underline'>
              8-956-123-00-05
            </a>
          </p>
          <p className='font-semibold'>
            Email:{' '}
            <a
              href='mailto:kofeiKnigi@mail.ru'
              className='text-blue-600 hover:underline'
            >
              kofeiKnigi@mail.ru
            </a>
          </p>
          <p className='text-sm md:text-base font-medium text-center text-gray-700 bg-gray-100 rounded-lg p-2 mt-4 leading-snug shadow-inner'>
            График работы:{' '}
            <span className='font-semibold'>пн, вт, ср, чт, пт:</span> 8:00 -
            19:00
            <br />
            <span className='font-semibold'>сб, вс:</span> 8:00 - 16:00
          </p>
        </div>
      </section>
    </div>
  );
}
