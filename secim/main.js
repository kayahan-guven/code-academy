const parties = [
    {
        id: 1,
        name: 'Aday 1',
        logo: 'red',
        vote_count: 5
    },
    {
        id: 2,
        name: 'Aday 2',
        logo: 'blue',
        vote_count: 10
    }
];

window.onload = function () {
    function getVotePercentage (voteCount) {
        let totalVote = 0;

        parties.forEach(function (party) {
            totalVote += party.vote_count;
        });

        return (voteCount / totalVote * 100).toFixed(2);
    }

    function populateDropdown () {
        var options = '<option disabled selected>Aday Seçiniz</option>';

        parties.forEach(function (party) {
            options += '<option value="'+ party.id +'">' + party.name + '</option>';
        });

        document.getElementById('adaylar').innerHTML = options;
    }
    function generatePartySection () {
        var partiesHTML = '';

        parties.forEach(function (party) {
            var percentage = getVotePercentage(party.vote_count);

            partiesHTML += '<div class="party">' +
                '<p>' + party.name + '</p>' +
                '<div class="logo" style="height: ' + percentage + '%; background-color: ' + party.logo + '; margin-top: ' + (100 - percentage) + '%"></div>' +
                '<div class="vote-percentage">' + percentage + '%</div>' +
                '</div>'
        });

        document.querySelector('.right-panel').innerHTML = partiesHTML;
    }

    function vote () {
        const id = Number(document.getElementById('adaylar').value);
        const partyIndex = parties.findIndex(party => party.id === id);

        parties[partyIndex].vote_count += 1;

        generatePartySection();
    }

    document.getElementById('vote-button').addEventListener('click', vote);

    populateDropdown();
    generatePartySection();
};




















