document.addEventListener('DOMContentLoaded', function() {
    fetchReviews();

    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const review = document.getElementById('review').value;

        console.log('Form submitted:', { name, email, review });

        fetch('https://review-system-q9mm.onrender.com/api/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                review: review,
            }),
        })
        .then(response => {
            console.log('Raw response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            document.getElementById('message').textContent = 'Review submitted successfully!';
            document.getElementById('reviewForm').reset();
            fetchReviews();
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            document.getElementById('message').textContent = 'An error occurred. Please try again.';
        });
    });
});

function fetchReviews() {
    fetch('https://review-system-q9mm.onrender.com/api/reviews/')
        .then(response => {
            console.log('Raw response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Fetched reviews:', data);
            const reviewsContainer = document.getElementById('reviews');
            reviewsContainer.innerHTML = '';
            data.forEach(review => {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                reviewItem.innerHTML = `
                    <p><strong>Name:</strong> ${review.name}</p>
                    <p><strong>Email:</strong> ${review.email}</p>
                    <p><strong>Review:</strong> ${review.review}</p>
                    <p><small>Posted on: ${new Date(review.created_at).toLocaleDateString()}</small></p>
                `;
                reviewsContainer.appendChild(reviewItem);
            });
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}
