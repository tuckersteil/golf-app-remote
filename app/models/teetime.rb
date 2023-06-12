class Teetime < ApplicationRecord
    belongs_to :user
    belongs_to :course
    validates :players, :price, :holes, :time, presence: true
    validates :players, :inclusion => 1..4
end
