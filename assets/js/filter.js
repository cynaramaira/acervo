document.addEventListener('DOMContentLoaded', function() {
    console.log('filter.js carregado e DOM pronto!'); // Mensagem de inicialização

    // Selecionar elementos
    const searchInput = document.getElementById('search-input');
    console.log('searchInput:', searchInput); // Verifica se o input de busca foi encontrado

    const startYearSelect = document.getElementById('start-year');
    console.log('startYearSelect:', startYearSelect); // Verifica se o select de ano inicial foi encontrado

    const endYearSelect = document.getElementById('end-year');
    console.log('endYearSelect:', endYearSelect); // Verifica se o select de ano final foi encontrado

    const yearPills = document.querySelectorAll('.year-pill');
    console.log('yearPills (NodeList):', yearPills); // Verifica se as pills de ano foram encontradas (deve ser uma NodeList)

    const clearFiltersBtn = document.getElementById('clear-filters');
    console.log('clearFiltersBtn:', clearFiltersBtn); // Verifica se o botão de limpar filtros foi encontrado

    const newsContainer = document.getElementById('news-container');
    console.log('newsContainer:', newsContainer); // Verifica se o contêiner de notícias foi encontrado

    // Verifica se newsContainer existe antes de tentar selecionar newsCards
    let newsCards = [];
    if (newsContainer) {
        newsCards = Array.from(newsContainer.querySelectorAll('.news-card'));
    }
    console.log('newsCards (Array):', newsCards); // Verifica se os cards de notícia foram encontrados (deve ser um Array de elementos)

    // Função para filtrar notícias
    function filterNews() {
        console.log('--- Função filterNews executada! ---'); // Indica que a função de filtro foi chamada

        // Prevenção para casos onde elementos podem ser null (embora os checks acima já ajudem)
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const startYear = startYearSelect ? startYearSelect.value : '';
        const endYear = endYearSelect ? endYearSelect.value : '';

        // Pega o 'data-year' da pill ativa. Se nenhuma estiver ativa, pode ser null/undefined.
        const activeYearPillElement = document.querySelector('.year-pill.active');
        const activeYearPill = activeYearPillElement ? activeYearPillElement.dataset.year : 'Todos'; // Garante 'Todos' se não houver ativa

        console.log('Filtros atuais:');
        console.log('  Termo de busca:', searchTerm);
        console.log('  Ano Inicial (select):', startYear);
        console.log('  Ano Final (select):', endYear);
        console.log('  Pill de Ano Ativa (data-year):', activeYearPill);

        newsCards.forEach(card => {
            const titleElement = card.querySelector('.card-title');
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const cardYear = card.dataset.year;
            let showCard = true;

            console.log(`Analisando card: Título="${title}", Ano="${cardYear}"`);

            // Filtrar por termo de busca
            if (searchTerm && !title.includes(searchTerm)) {
                showCard = false;
                console.log(`  - Escondendo: Termo de busca "${searchTerm}" não encontrado.`);
            }

            // Filtrar por ano inicial
            // Considera 'Todos' no select como não filtrado
            if (startYear !== 'Todos' && startYear && cardYear < startYear) {
                showCard = false;
                console.log(`  - Escondendo: Ano do card (${cardYear}) menor que Ano Inicial (${startYear}).`);
            }

            // Filtrar por ano final
            // Considera 'Todos' no select como não filtrado
            if (endYear !== 'Todos' && endYear && cardYear > endYear) {
                showCard = false;
                console.log(`  - Escondendo: Ano do card (${cardYear}) maior que Ano Final (${endYear}).`);
            }

            // Filtrar por pill de ano
            // Aplica o filtro da pill somente se não for 'Todos' ou vazio
            if (activeYearPill !== 'Todos' && activeYearPill !== '') {
                if (activeYearPill.includes('-')) {
                    // Se for um intervalo (ex: "2015-2019")
                    if (!isYearInRange(parseInt(cardYear), activeYearPill)) {
                        showCard = false;
                        console.log(`  - Escondendo: Ano do card (${cardYear}) fora do intervalo da pill (${activeYearPill}).`);
                    }
                } else {
                    // Se for um ano único (ex: "2024")
                    if (cardYear !== activeYearPill) {
                        showCard = false;
                        console.log(`  - Escondendo: Ano do card (${cardYear}) diferente da pill (${activeYearPill}).`);
                    }
                }
            }

            if (showCard) {
                card.classList.remove('hidden');
                console.log('  - Card VISÍVEL.');
            } else {
                card.classList.add('hidden');
                console.log('  - Card ESCONDIDO.');
            }
        });
        console.log('--- Fim da execução de filterNews. ---');
    }

    // Função para verificar se o ano está em um intervalo
    function isYearInRange(year, range) {
        const [start, end] = range.split('-').map(Number);
        return year >= start && year <= end;
    }

    // Adicionar eventos
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Evento: Input de busca alterado. Valor:', this.value);
            filterNews();
        });
    }

    if (startYearSelect) {
        startYearSelect.addEventListener('change', function() {
            console.log('Evento: Select Ano Inicial alterado. Valor:', this.value);
            filterNews();
        });
    }

    if (endYearSelect) {
        endYearSelect.addEventListener('change', function() {
            console.log('Evento: Select Ano Final alterado. Valor:', this.value);
            filterNews();
        });
    }

    yearPills.forEach(pill => {
        pill.addEventListener('click', function() {
            console.log('Evento: Pill de ano clicada. Data-year:', this.dataset.year);
            yearPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            filterNews();
        });
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            console.log('Evento: Botão Limpar Filtros clicado.');
            if (searchInput) searchInput.value = '';
            if (startYearSelect) startYearSelect.value = 'Todos'; // Resetar para 'Todos'
            if (endYearSelect) endYearSelect.value = 'Todos'; // Resetar para 'Todos'
            yearPills.forEach(p => p.classList.remove('active'));
            // Garante que "Todos" seja a pill ativa após limpar filtros, se existir
            const allPill = document.querySelector('.year-pill[data-year="Todos"]'); // Mudança aqui para 'Todos'
            if (allPill) {
                allPill.classList.add('active');
                console.log('  - Pill "Todos" ativada.');
            }
            filterNews();
        });
    }


    // Chama filterNews() uma vez no carregamento para aplicar o filtro inicial (Todos ativos)
    // Se você quer que a pill "Todos" esteja ativa por padrão, você precisa adicioná-la no HTML com data-year="Todos"
    // e adicionar a classe 'active' a ela ou garantir que o clearFiltersBtn a ative no carregamento
    const initialAllPill = document.querySelector('.year-pill[data-year="Todos"]');
    if (initialAllPill && !initialAllPill.classList.contains('active')) {
         initialAllPill.classList.add('active');
         console.log('Pill "Todos" ativada no carregamento.');
    }
    filterNews();
});