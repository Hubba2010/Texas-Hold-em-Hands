function hand(holeCards, communityCards) {
	function sortingDesc(arr) {
		arr.sort(function (a, b) {
			let aa = ALL_RANKS.indexOf(a);
			let bb = ALL_RANKS.indexOf(b);
			return bb - aa;
		});
	}
	function sortingAsc(arr) {
		arr.sort(function (a, b) {
			let aa = ALL_RANKS.indexOf(a);
			let bb = ALL_RANKS.indexOf(b);
			return aa - bb;
		});
	}

	const ALL_CARDS = [...holeCards, ...communityCards];
	const ALL_RANKS = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
		'A',
	];
	const ALL_SYMBOLS = ['♠', '♦', '♣', '♥'];
	const returnRanks = ALL_CARDS.map((rank) => {
		return rank.length > 2 ? rank[0] + rank[1] : rank[0];
	});
	const sortRanks = sortingDesc(returnRanks);
	const returnSymbols = ALL_CARDS.map((symbol) => {
		return symbol.length > 2 ? symbol[2] : symbol[1];
	});

	/// START WITH NOTHING
	let hand = 'nothing';
	let kickers = returnRanks.slice(0, 5);
	let kickers_one = [];
	let filtered = [];
	let isPair = false;
	let isThreeOfKind = false;
	let isFullHouse = false;
	let isStraight = false;
	let isStraightFlush = false;
	let isfourOfAKind = false;
	let isFlush = false;
	/////////////
	/////////
	/////// CHECK IF THERE IS A PAIR OR TWO PAIR

	let pairCount = 0;
	for (let i = 0; i < returnRanks.length - 1; i++) {
		if (returnRanks[i] === returnRanks[i + 1]) {
			kickers[pairCount] = returnRanks[i];
			pairCount++;
			kickers = kickers.slice(0, 2);
		}
		if (pairCount === 1) {
			kickers = kickers.slice(0, 1);
		}
	}
	filtered = returnRanks.filter((e) => !kickers.includes(e));
	if (pairCount === 1) {
		kickers = kickers.slice(0, 1).concat(filtered.slice(0, 3));
		isPair = true;
	}
	if (pairCount >= 2) {
		kickers = kickers.slice(0, 2).concat(filtered.slice(0, 1));
		isPair = true;
	}
	///////////////////////
	///////////////////////
	///////////////// CHECK IF THERE IS FULL-HOUSE OR THREE OF A KIND
	let count = 0;
	for (let i = 0; i < returnRanks.length; i++) {
		if (returnRanks[i] === returnRanks[i + 1]) {
			count++;
		} else {
			if (count >= 1 && !kickers_one[1]) {
				kickers_one[1] = returnRanks[i];
			}
			count = 0;
		}
		if (count === 2 && !kickers_one[0]) {
			kickers_one[0] = returnRanks[i];
			count = 0;
			isThreeOfKind = true;
		}
	}
	if (kickers_one.length === 2 && kickers_one[0]) isFullHouse = true;
	if (isThreeOfKind && kickers_one[0] !== kickers_one[1]) {
	} else {
	}
	///
	if (isThreeOfKind && kickers_one.length == 1) {
		filtered = returnRanks.filter((e) => {
			return !kickers_one.includes(e);
		});
		kickers_one = kickers_one.concat(filtered.slice(0, 2));
	}

	////////////////////
	////////////////////
	//////////// CHECK IF THERE IS A STRAIGHT
	let currentCardIndex;
	let nextCardIndex;
	let strCount = 0;
	let kickers_two = [];
	for (let i = 0; i < returnRanks.length; i++) {
		currentCardIndex = ALL_RANKS.indexOf(returnRanks[i]);
		nextCardIndex = ALL_RANKS.indexOf(returnRanks[i + 1]);

		if (currentCardIndex - nextCardIndex == 1 && nextCardIndex != -1) {
			strCount++;
		} else {
			strCount = 0;
		}
		if (strCount === 4) {
			isStraight = true;
			kickers_two.push(returnRanks[i - 3]);
			kickers_two.push(returnRanks[i - 2]);
			kickers_two.push(returnRanks[i - 1]);
			kickers_two.push(returnRanks[i]);
			kickers_two.push(returnRanks[i + 1]);
		}
	}
	ALL_CARDS.sort(function (a, b) {
		if (a.length === 3) {
			a = a[0] + a[1];
		} else {
			a = a[0];
		}
		if (b.length === 3) {
			b = b[0] + b[1];
		} else {
			b = b[0];
		}
		let aa = ALL_RANKS.indexOf(a);
		let bb = ALL_RANKS.indexOf(b);
		return bb - aa;
	});
	//////////////////
	///////////////// CHECK IF FLUSH
	let spades = 0;
	let hearts = 0;
	let diamonds = 0;
	let clubs = 0;
	let kickers_three = [];
	for (let i = 0; i < ALL_CARDS.length; i++) {
		let symbol = ALL_CARDS[i][1];
		let tenSymbol = ALL_CARDS[i][2];
		if (symbol === '♠' || tenSymbol === '♠') spades++;
		if (symbol === '♥' || tenSymbol === '♥') hearts++;
		if (symbol === '♦' || tenSymbol === '♦') diamonds++;
		if (symbol === '♣' || tenSymbol === '♣') clubs++;
	}
	if (spades >= 5 || hearts >= 5 || diamonds >= 5 || clubs >= 5) isFlush = true;

	if (spades >= 5) {
		kickers_three = returnRanks.filter((e, i) => {
			return ALL_CARDS[i][1] === '♠' || ALL_CARDS[i][2] === '♠';
		});
		kickers_three = kickers_three.slice(0, 5);
	}
	if (hearts >= 5) {
		kickers_three = returnRanks.filter((e, i) => {
			return ALL_CARDS[i][1] === '♥' || ALL_CARDS[i][2] === '♥';
		});
		kickers_three = kickers_three.slice(0, 5);
	}
	if (diamonds >= 5) {
		kickers_three = returnRanks.filter((e, i) => {
			return ALL_CARDS[i][1] === '♦' || ALL_CARDS[i][2] === '♦';
		});
		kickers_three = kickers_three.slice(0, 5);
	}
	if (clubs >= 5) {
		kickers_three = returnRanks.filter((e, i) => {
			return ALL_CARDS[i][1] === '♣' || ALL_CARDS[i][2] === '♣';
		});
		kickers_three = kickers_three.slice(0, 5);
	}

	////////////
	/////////////
	/// CHECK IF STRAIGHT FLUSH

	for (let i = 0; i < ALL_CARDS.length - 1; i++) {
		if (!isFlush) break;
		currentCardIndex = ALL_RANKS.indexOf(returnRanks[i]);
		nextCardIndex = ALL_RANKS.indexOf(returnRanks[i + 1]);
		let symbol = ALL_CARDS[i][2] || ALL_CARDS[i][1];
		let nextSymbol = ALL_CARDS[i + 1][2] || ALL_CARDS[i + 1][1];

		if (currentCardIndex - nextCardIndex == 1 && symbol === nextSymbol) {
			strCount++;
		} else {
			strCount = 0;
		}
		if (strCount === 4) {
			isStraightFlush = true;
			kickers_two = [];
			kickers_two.push(returnRanks[i - 3]);
			kickers_two.push(returnRanks[i - 2]);
			kickers_two.push(returnRanks[i - 1]);
			kickers_two.push(returnRanks[i]);
			kickers_two.push(returnRanks[i + 1]);
		}
	}
	////////////////////////////////////////
	/////////////////// CHECK IF FOUR OF A KIND
	let kickers_four = [];
	for (let i = 0; i < returnRanks.length - 3; i++) {
		if (
			returnRanks[i] === returnRanks[i + 1] &&
			returnRanks[i + 1] === returnRanks[i + 2] &&
			returnRanks[i + 2] === returnRanks[i + 3]
		) {
			isfourOfAKind = true;
			kickers_four.push(returnRanks[i]);
			filtered = returnRanks.filter((e, i) => {
				return !kickers_four.includes(e);
			});
			kickers_four = kickers_four.concat(filtered[0]);
		}
	}
	let straightAttempt;
	let ranks;
	function typeOfHand() {
		if (isStraightFlush) {
			straightAttempt = new Set(kickers_three);
			straightAttempt = Array.from(straightAttempt);
			if (
				straightAttempt.length == 6 &&
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) !==
					4
			) {
				straightAttempt = straightAttempt.slice(1, 6);
			}
			straightAttempt = straightAttempt.slice(0, 5);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight-flush';
			}
			ranks = kickers_two;
			return 'straight-flush';
		}
		if (isfourOfAKind) {
			ranks = kickers_four;
			return 'four-of-a-kind';
		}
		if (isFullHouse) {
			ranks = kickers_one;
			return 'full house';
		}
		if (isFlush) {
			straightAttempt = new Set(kickers_three);
			straightAttempt = Array.from(straightAttempt);
			if (
				straightAttempt.length == 6 &&
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) !==
					4
			) {
				straightAttempt = straightAttempt.slice(1, 6);
			}
			straightAttempt = straightAttempt.slice(0, 5);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight-flush';
			}
			//
			spades = 0;
			hearts = 0;
			diamonds = 0;
			clubs = 0;
			let straightAttempt2 = ALL_CARDS.slice(1);
			for (let i = 0; i < straightAttempt2.length - 1; i++) {
				currentCardIndex = ALL_RANKS.indexOf(returnRanks[i]);
				nextCardIndex = ALL_RANKS.indexOf(returnRanks[i + 1]);
				let symbol = ALL_CARDS[i][2] || ALL_CARDS[i][1];
				if (symbol === '♠') spades++;
				if (symbol === '♥') hearts++;
				if (symbol === '♦') diamonds++;
				if (symbol === '♣') clubs++;
			}
			if (
				(spades >= 4 || hearts >= 4 || diamonds >= 4 || clubs >= 4) &&
				ALL_RANKS.indexOf(straightAttempt2[0][0]) -
					ALL_RANKS.indexOf(straightAttempt2[5][0]) ===
					4
			) {
				ranks = new Set(returnRanks.slice(1, 7));
				ranks = Array.from(ranks);
				return 'straight-flush';
			}
			//
			ranks = kickers_three;
			return 'flush';
		}
		if (isStraight) {
			straightAttempt = new Set(returnRanks);
			straightAttempt = Array.from(straightAttempt);
			if (
				straightAttempt.length == 6 &&
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) !==
					4
			) {
				straightAttempt = straightAttempt.slice(1, 6);
			}
			straightAttempt = straightAttempt.slice(0, 5);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight';
			}
			ranks = kickers_two;
			return 'straight';
		}
		if (isThreeOfKind) {
			straightAttempt = new Set(returnRanks);
			straightAttempt = Array.from(straightAttempt);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight';
			}
			ranks = kickers_one;
			return 'three-of-a-kind';
		}
		if (kickers.length == 3) {
			straightAttempt = new Set(returnRanks);
			straightAttempt = Array.from(straightAttempt);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight';
			}
			ranks = kickers;
			return 'two pair';
		}
		if (isPair) {
			straightAttempt = new Set(returnRanks);
			straightAttempt = Array.from(straightAttempt);
			if (
				straightAttempt.length == 6 &&
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) !==
					4
			) {
				straightAttempt = straightAttempt.slice(1, 6);
			}
			straightAttempt = straightAttempt.slice(0, 5);
			if (
				ALL_RANKS.indexOf(straightAttempt[0]) -
					ALL_RANKS.indexOf(straightAttempt[4]) ===
				4
			) {
				ranks = straightAttempt;
				return 'straight';
			}
			ranks = kickers;
			return 'pair';
		}
		return 'nothing';
	}
	if (typeOfHand() == 'nothing') {
		ranks = kickers;
	}
	console.log(ALL_CARDS);
	return { type: typeOfHand(), ranks: ranks };
}

///////////////////// TEST VALUES
// SYMBOLS: ♥ ♦ ♣ ♠
console.log('Nothing: ', hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']));
console.log('One Pair: ', hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']));
console.log('Tthree of a kind: ', hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']));
console.log('Straight: ', hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦']));
console.log('Flush: ', hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']));
console.log('Full House: ', hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']));
console.log('Four of a Kind: ', hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦']));
console.log('Straight Flush: ', hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']));
