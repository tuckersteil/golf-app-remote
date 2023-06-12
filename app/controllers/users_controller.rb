class UsersController < ApplicationController
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created 
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
        end
    end 

    def index 
        user = User.all
        render json: user
    end 

    def show 
        user = User.find_by(id: session[:user_id])
        if user 
            render json: user, status: :created
        else
           render json: { error: "Not authorized" }, status: :unauthorized
        end 
    end 

    def destroy 
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    def usertime
        user = User.find_by(id: session[:user_id])
        render json: user.teetimes
    end

    private 

    def user_params 
        params.permit(:username, :password, :password_confirmation)
    end 
end
