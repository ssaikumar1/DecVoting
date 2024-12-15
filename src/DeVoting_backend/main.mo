import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Option "mo:base/Option";
import Order "mo:base/Order";

actor {
    public type Candidate = {
        id: Nat;
        name: Text;
        symbol: Text;
        votes: Nat;
    };

    private stable var nextCandidateId : Nat = 0; //storing
    private var candidates = HashMap.HashMap<Nat, Candidate>(0, Nat.equal, Hash.hash);

// function to add candidate to participate in election
    public func addCandidate(name: Text, symbol: Text) : async Nat {
        let id = nextCandidateId;
        let newCandidate : Candidate = {
            id = id;
            name = name;
            symbol = symbol;
            votes = 0;
        };
        candidates.put(id, newCandidate);
        nextCandidateId += 1;
        id
    };
// retreving all the candidates registered
    public query func getAllCandidates() : async [Candidate] {
        Iter.toArray(candidates.vals())
    };
// function to vote on the candidates
    public func vote(candidateId: Nat) : async Text {
        switch (candidates.get(candidateId)) {
            case (null) {
                "Candidate not found"
            };
            case (?candidate) {
                let updatedCandidate : Candidate = {
                    id = candidate.id;
                    name = candidate.name;
                    symbol = candidate.symbol;
                    votes = candidate.votes + 1;
                };
                candidates.put(candidateId, updatedCandidate);
                "Vote recorded successfully"
            };
        }
    };

// function to get results and place the candidate with high votes in the first place
    public query func getResults() : async [Candidate] {
        var results = Iter.toArray(candidates.vals());
        Array.sort(results, func (a: Candidate, b: Candidate) : Order.Order {
            if (a.votes > b.votes) { #less } else if (a.votes < b.votes) { #greater } else { #equal }
        })
    };
// function to get the leader with high votes
    public query func getCurrentLeader() : async ?Candidate {
        let results = Iter.toArray(candidates.vals());
        if (results.size() > 0) {
            var leader = results[0];
            for (candidate in results.vals()) {
                if (candidate.votes > leader.votes) {
                    leader := candidate;
                };
            };
            ?leader
        } else {
            null
        }
    };
// funtion to get the vote count for the candidates.
    public query func getVoteCounts() : async [(Nat, Nat)] {
        Iter.toArray(
            Iter.map<(Nat, Candidate), (Nat, Nat)>(
                candidates.entries(),
                func ((id, candidate): (Nat, Candidate)): (Nat, Nat) {
                    (id, candidate.votes)
                }
            )
        )
    };
}