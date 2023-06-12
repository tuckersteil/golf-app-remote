class CreateTeetimes < ActiveRecord::Migration[7.0]
  def change
    create_table :teetimes do |t|
      t.string :time
      t.string :date
      t.integer :players
      t.integer :price
      t.integer :holes
      t.integer :user_id
      t.integer :course_id
      t.string :status

      t.timestamps
    end
  end
end
