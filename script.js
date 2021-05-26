const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const amount = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //parseInt(string)->num

// to update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // storing the indexes in an array
    const seatIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    // [...arr] -> spread operator

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = `${selectedSeatsCount}`;
    amount.innerText = `${selectedSeatsCount * ticketPrice}`
}

// save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice); 
}

// get data from local storage and populate UI
function populateUI(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeat);
    if(selectedSeat !== null && selectedSeat.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeat.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    count.innerText = selectedSeat.length;
    amount.innerText = (selectedSeat.length*(+movieSelect.value));

}

// *************Adding event listeners*************
// movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
    populateUI();
});

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})


