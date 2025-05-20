document.addEventListener('DOMContentLoaded', function() {
        // Selecionar elementos
        const searchInput = document.getElementById('search-input');
        const startYearSelect = document.getElementById('start-year');
        const endYearSelect = document.getElementById('end-year');
        const yearPills = document.querySelectorAll('.year-pill');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const newsContainer = document.getElementById('news-container');
        const newsCards = Array.from(newsContainer.querySelectorAll('.news-card'));

        // Função para filtrar notícias
        function filterNews() {
            const searchTerm = searchInput.value.toLowerCase();
            const startYear = startYearSelect.value;
            const endYear = endYearSelect.value;
            const activeYearPill = document.querySelector('.year-pill.active').dataset.year;

            newsCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                // const não existe atualmente, quem sabe no futuro const text = card.querySelector('.card-text').textContent.toLowerCase();
                const cardYear = card.dataset.year;
                let showCard = true;

                // Filtrar por termo de busca
                if (searchTerm && !title.includes(searchTerm)) {
                    showCard = false;
                }

                // Filtrar por ano inicial
                if (startYear && cardYear < startYear) {
                    showCard = false;
                }

                // Filtrar por ano final
                if (endYear && cardYear > endYear) {
                    showCard = false;
                }

                // Filtrar por pill de ano
                 // Garanta que o cardYear seja tratado como número para comparação de intervalo
                 if (activeYearPill && activeYearPill !== '') {
                    if (activeYearPill.includes('-')) {
                        // Se for um intervalo (ex: "2015-2019")
                        if (!isYearInRange(parseInt(cardYear), activeYearPill)) { // Usar parseInt aqui
                    showCard = false;
                        }
                } else {
                     // Se for um ano único (ex: "2024")
                     if (cardYear !== activeYearPill) {
                    showCard = false;
                        }
                    }
                }   
                if (showCard) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        // Função para verificar se o ano está em um intervalo
        function isYearInRange(year, range) {
            const [start, end] = range.split('-').map(Number);
            return year >= start && year <= end;
        }

        // Adicionar eventos
        searchInput.addEventListener('input', filterNews);
        startYearSelect.addEventListener('change', filterNews);
        endYearSelect.addEventListener('change', filterNews);

        yearPills.forEach(pill => {
            pill.addEventListener('click', function() {
                yearPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                filterNews();
            });
        });

        clearFiltersBtn.addEventListener('click', function() {
            searchInput.value = '';
            startYearSelect.value = '';
            endYearSelect.value = '';
            yearPills.forEach(p => p.classList.remove('active'));
            yearPills[0].classList.add('active');
            filterNews();
        });
    });